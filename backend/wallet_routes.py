"""
Wallet & User Management Routes for Dynamic Wallet Connection
Endpoints required by WalletConnectModal component
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime, timezone
from uuid import uuid4
import random
import string
import os
from motor.motor_asyncio import AsyncIOMotorClient

# Database connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'fomo_strategy')
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

router = APIRouter()

# ==================== MODELS ====================

class UserWallet(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid4()))
    wallet_address: str
    invite_code: str  # User's own invite code for referrals
    referred_by: Optional[str] = None  # Invite code used during registration
    twitter_username: Optional[str] = None
    twitter_verified: bool = False
    terms_accepted: bool = False  # Whether user has accepted terms
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RegisterWalletRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    wallet_address: str
    invite_code: str = ""  # Code used for registration (empty string if not provided)

class VerifyInviteRequest(BaseModel):
    invite_code: str

class ConnectTwitterRequest(BaseModel):
    wallet_address: str
    twitter_username: str

class AcceptTermsRequest(BaseModel):
    wallet_address: str

# ==================== HELPERS ====================

def generate_invite_code() -> str:
    """Generate 6-character invite code (uppercase letters + digits)"""
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choices(chars, k=6))

# ==================== ENDPOINTS ====================

@router.post("/user/register")
async def register_user_wallet(request: RegisterWalletRequest):
    """Register wallet and create user with invite code"""
    wallet = request.wallet_address.lower()
    invite = request.invite_code.strip().upper() if request.invite_code else ""
    
    # Check if wallet already exists
    existing = await db.user_wallets.find_one({"wallet_address": wallet}, {"_id": 0})
    if existing:
        return {
            "success": True,
            "is_new": False,
            "user": existing,
            "message": "Wallet already registered"
        }
    
    # Validate invite code if provided
    referred_by = None
    if invite:
        referrer = await db.user_wallets.find_one(
            {"invite_code": invite}, 
            {"_id": 0}
        )
        if referrer:
            referred_by = invite
    
    # Generate unique invite code for new user
    new_invite_code = generate_invite_code()
    while await db.user_wallets.find_one({"invite_code": new_invite_code}):
        new_invite_code = generate_invite_code()
    
    # Create new user
    new_user = UserWallet(
        wallet_address=wallet,
        invite_code=new_invite_code,
        referred_by=referred_by
    )
    
    await db.user_wallets.insert_one(new_user.model_dump())
    
    return {
        "success": True,
        "is_new": True,
        "user": new_user.model_dump(),
        "message": "Wallet registered successfully"
    }

@router.get("/user/{wallet_address}")
async def get_user_wallet_info(wallet_address: str):
    """Get wallet registration info"""
    wallet = wallet_address.lower()
    user = await db.user_wallets.find_one({"wallet_address": wallet}, {"_id": 0})
    
    if not user:
        return {"exists": False, "user": None}
    
    return {"exists": True, "user": user}

@router.post("/invite/verify")
async def verify_invite_code(request: VerifyInviteRequest):
    """Verify if invite code is valid"""
    code = request.invite_code.upper().strip()
    
    if len(code) != 6:
        return {"valid": False, "message": "Invalid code format"}
    
    referrer = await db.user_wallets.find_one({"invite_code": code}, {"_id": 0})
    
    if referrer:
        return {"valid": True, "message": "Valid invite code"}
    
    return {"valid": False, "message": "Invite code not found"}

@router.post("/twitter/connect")
async def connect_twitter(request: ConnectTwitterRequest):
    """Connect Twitter account to wallet (stub - just saves username)"""
    wallet = request.wallet_address.lower()
    
    # Update user with Twitter info
    result = await db.user_wallets.update_one(
        {"wallet_address": wallet},
        {
            "$set": {
                "twitter_username": request.twitter_username,
                "twitter_verified": True,  # Stub: auto-verify
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Wallet not found")
    
    return {"success": True, "message": "Twitter connected successfully"}

@router.post("/user/accept-terms")
async def accept_user_terms(request: AcceptTermsRequest):
    """Accept terms and conditions for a wallet"""
    wallet = request.wallet_address.lower()
    
    # Update user with terms acceptance
    result = await db.user_wallets.update_one(
        {"wallet_address": wallet},
        {
            "$set": {
                "terms_accepted": True,
                "updated_at": datetime.now(timezone.utc).isoformat()
            }
        }
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Wallet not found")
    
    return {"success": True, "message": "Terms accepted successfully"}

@router.get("/referrals/{wallet_address}")
async def get_referrals(wallet_address: str):
    """Get list of users referred by this wallet"""
    wallet = wallet_address.lower()
    user = await db.user_wallets.find_one({"wallet_address": wallet}, {"_id": 0})
    
    if not user:
        raise HTTPException(status_code=404, detail="Wallet not found")
    
    # Find all users referred by this user's invite code
    referrals = await db.user_wallets.find(
        {"referred_by": user["invite_code"]},
        {"_id": 0, "wallet_address": 1, "created_at": 1}
    ).to_list(100)
    
    return {
        "invite_code": user["invite_code"],
        "referral_count": len(referrals),
        "referrals": referrals
    }
