#!/usr/bin/env python3
"""
Backend API Tests for FOMO Strategy NFT Platform
Testing all required API endpoints:
1. GET /api/ - Health check
2. GET /api/strategy/state - Get strategy state
3. GET /api/statistics - Get statistics
"""

import requests
import json
import os
from pathlib import Path

# Load frontend .env to get backend URL
def load_frontend_env():
    env_path = Path("/app/frontend/.env")
    env_vars = {}
    if env_path.exists():
        with open(env_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    key, value = line.split('=', 1)
                    env_vars[key] = value
    return env_vars

def test_health_check():
    """Test GET /api/ - Health check endpoint"""
    print("=" * 60)
    print("TESTING: Health Check API")
    print("=" * 60)
    
    # Get backend URL from frontend .env
    env_vars = load_frontend_env()
    backend_url = env_vars.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
    
    print(f"Backend URL: {backend_url}")
    
    # Test endpoint
    endpoint = f"{backend_url}/api/"
    print(f"Testing endpoint: {endpoint}")
    
    try:
        # Make API request
        response = requests.get(endpoint, timeout=10)
        print(f"Response Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response text: {response.text}")
            return False
        
        # Parse JSON response
        try:
            data = response.json()
            print("✅ SUCCESS: Valid JSON response received")
            print(f"Response: {json.dumps(data, indent=2)}")
        except json.JSONDecodeError as e:
            print(f"❌ FAILED: Invalid JSON response - {e}")
            print(f"Response text: {response.text}")
            return False
        
        # Check if message exists
        if 'message' in data:
            print("✅ Health check endpoint working correctly")
            return True
        else:
            print("❌ FAILED: Expected 'message' field in response")
            return False
        
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Network error - {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED: Unexpected error - {e}")
        return False

def test_statistics_endpoint():
    """Test GET /api/statistics endpoint"""
    print("=" * 60)
    print("TESTING: Statistics API")
    print("=" * 60)
    
    # Get backend URL from frontend .env
    env_vars = load_frontend_env()
    backend_url = env_vars.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
    
    print(f"Backend URL: {backend_url}")
    
    # Test endpoint
    endpoint = f"{backend_url}/api/statistics"
    print(f"Testing endpoint: {endpoint}")
    
    try:
        # Make API request
        response = requests.get(endpoint, timeout=10)
        print(f"Response Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response text: {response.text}")
            return False
        
        # Parse JSON response
        try:
            data = response.json()
            print("✅ SUCCESS: Valid JSON response received")
        except json.JSONDecodeError as e:
            print(f"❌ FAILED: Invalid JSON response - {e}")
            print(f"Response text: {response.text}")
            return False
        
        # Verify response structure
        print("\n" + "=" * 40)
        print("VERIFYING STATISTICS DATA")
        print("=" * 40)
        
        success = True
        required_fields = [
            'nft_floor_price', 'token_price', 'market_cap', 'total_volume_24h',
            'total_nfts_owned', 'total_buybacks', 'total_burned', 'treasury_balance'
        ]
        
        for field in required_fields:
            if field in data:
                print(f"✅ {field}: {data[field]}")
            else:
                print(f"❌ {field}: Missing")
                success = False
        
        # Print full response for debugging
        print(f"\n" + "=" * 40)
        print("FULL STATISTICS RESPONSE")
        print("=" * 40)
        print(json.dumps(data, indent=2))
        
        return success
        
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Network error - {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED: Unexpected error - {e}")
        return False

def test_strategy_state_endpoint():
    """Test GET /api/strategy/state endpoint for Hero section stats"""
    print("=" * 60)
    print("TESTING: Hero Section Statistics API")
    print("=" * 60)
    
    # Get backend URL from frontend .env
    env_vars = load_frontend_env()
    backend_url = env_vars.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
    
    print(f"Backend URL: {backend_url}")
    
    # Test endpoint
    endpoint = f"{backend_url}/api/strategy/state"
    print(f"Testing endpoint: {endpoint}")
    
    try:
        # Make API request
        response = requests.get(endpoint, timeout=10)
        print(f"Response Status: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response text: {response.text}")
            return False
        
        # Parse JSON response
        try:
            data = response.json()
            print("✅ SUCCESS: Valid JSON response received")
        except json.JSONDecodeError as e:
            print(f"❌ FAILED: Invalid JSON response - {e}")
            print(f"Response text: {response.text}")
            return False
        
        # Verify response structure and values
        print("\n" + "=" * 40)
        print("VERIFYING HERO SECTION DATA")
        print("=" * 40)
        
        success = True
        
        # Test 1: NFT Circulation (market_circulating)
        expected_circulation = 4540
        actual_circulation = data.get('nft_supply', {}).get('market_circulating')
        print(f"NFT Circulation: {actual_circulation} (expected: {expected_circulation})")
        
        if actual_circulation == expected_circulation:
            print("✅ NFT Circulation: PASS")
        else:
            print(f"❌ NFT Circulation: FAIL - Expected {expected_circulation}, got {actual_circulation}")
            success = False
        
        # Test 2: $F Tokens Burned
        expected_tokens_burned = 2847500
        actual_tokens_burned = data.get('activity', {}).get('tokens_burned')
        print(f"$F Tokens Burned: {actual_tokens_burned} (expected: {expected_tokens_burned})")
        
        if actual_tokens_burned == expected_tokens_burned:
            print("✅ $F Tokens Burned: PASS")
        else:
            print(f"❌ $F Tokens Burned: FAIL - Expected {expected_tokens_burned}, got {actual_tokens_burned}")
            success = False
        
        # Test 3: Treasury Accumulation (eth_balance)
        expected_eth_balance = 24.73
        actual_eth_balance = data.get('treasury', {}).get('eth_balance')
        print(f"Treasury ETH Balance: {actual_eth_balance} (expected: {expected_eth_balance})")
        
        if actual_eth_balance == expected_eth_balance:
            print("✅ Treasury ETH Balance: PASS")
        else:
            print(f"❌ Treasury ETH Balance: FAIL - Expected {expected_eth_balance}, got {actual_eth_balance}")
            success = False
        
        # Test 4: Verify complete response structure
        print(f"\n" + "=" * 40)
        print("RESPONSE STRUCTURE VERIFICATION")
        print("=" * 40)
        
        required_sections = ['timestamp', 'treasury', 'nft_supply', 'activity', 'market', 'liquidity', 'distribution']
        for section in required_sections:
            if section in data:
                print(f"✅ {section}: Present")
            else:
                print(f"❌ {section}: Missing")
                success = False
        
        # Print full response for debugging
        print(f"\n" + "=" * 40)
        print("FULL API RESPONSE")
        print("=" * 40)
        print(json.dumps(data, indent=2))
        
        return success
        
    except requests.exceptions.RequestException as e:
        print(f"❌ FAILED: Network error - {e}")
        return False
    except Exception as e:
        print(f"❌ FAILED: Unexpected error - {e}")
        return False

def main():
    """Run all backend tests"""
    print("Starting Backend API Tests for Hero Section Statistics")
    print("=" * 60)
    
    # Test strategy state endpoint
    test_passed = test_strategy_state_endpoint()
    
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    if test_passed:
        print("✅ ALL TESTS PASSED: Hero section API is working correctly")
        print("✅ NFT Circulation, $F Tokens Burned, and Treasury Balance all return expected values")
        return True
    else:
        print("❌ TESTS FAILED: Hero section API has issues")
        print("❌ Check the failed assertions above for details")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)