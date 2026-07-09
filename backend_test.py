#!/usr/bin/env python3
"""
Comprehensive backend test suite for Bionivid Headless CMS
Tests all API endpoints end-to-end
"""
import requests
import json
import sys
from typing import Dict, Any, Optional

# Base URL from frontend/.env
BASE_URL = "https://nivilabs-showcase.preview.emergentagent.com/api"

# Test credentials
ADMIN_EMAIL = "admin@bionivid.com"
ADMIN_PASSWORD = "Admin@1234"

# Global token storage
access_token: Optional[str] = None

# Test results tracking
test_results = {
    "passed": [],
    "failed": [],
    "warnings": []
}


def log_pass(test_name: str, details: str = ""):
    """Log a passing test"""
    msg = f"✅ PASS: {test_name}"
    if details:
        msg += f" - {details}"
    print(msg)
    test_results["passed"].append(test_name)


def log_fail(test_name: str, details: str):
    """Log a failing test"""
    msg = f"❌ FAIL: {test_name} - {details}"
    print(msg)
    test_results["failed"].append(f"{test_name}: {details}")


def log_warning(test_name: str, details: str):
    """Log a warning"""
    msg = f"⚠️  WARNING: {test_name} - {details}"
    print(msg)
    test_results["warnings"].append(f"{test_name}: {details}")


def get_headers(with_auth: bool = False) -> Dict[str, str]:
    """Get request headers"""
    headers = {"Content-Type": "application/json"}
    if with_auth and access_token:
        headers["Authorization"] = f"Bearer {access_token}"
    return headers


# ============================================================================
# TEST 1: Authentication
# ============================================================================
def test_auth_login():
    """Test POST /api/auth/login with valid and invalid credentials"""
    print("\n" + "="*80)
    print("TEST 1: Authentication - POST /api/auth/login")
    print("="*80)
    
    global access_token
    
    # Test 1a: Valid login
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD},
            headers=get_headers()
        )
        
        if response.status_code == 200:
            data = response.json()
            if "access_token" in data and "admin" in data:
                access_token = data["access_token"]
                admin = data["admin"]
                if admin.get("email") == ADMIN_EMAIL.lower():
                    log_pass("Login with valid credentials", f"Token received, admin: {admin.get('name')}")
                else:
                    log_fail("Login with valid credentials", f"Admin email mismatch: {admin.get('email')}")
            else:
                log_fail("Login with valid credentials", f"Missing access_token or admin in response: {data}")
        else:
            log_fail("Login with valid credentials", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("Login with valid credentials", f"Exception: {str(e)}")
    
    # Test 1b: Invalid password
    try:
        response = requests.post(
            f"{BASE_URL}/auth/login",
            json={"email": ADMIN_EMAIL, "password": "WrongPassword123"},
            headers=get_headers()
        )
        
        if response.status_code == 401:
            log_pass("Login with wrong password returns 401")
        else:
            log_fail("Login with wrong password", f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_fail("Login with wrong password", f"Exception: {str(e)}")


def test_auth_me():
    """Test GET /api/auth/me with and without token"""
    print("\n" + "="*80)
    print("TEST 2: Authentication - GET /api/auth/me")
    print("="*80)
    
    # Test 2a: With valid token
    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            headers=get_headers(with_auth=True)
        )
        
        if response.status_code == 200:
            data = response.json()
            if "email" in data and data["email"] == ADMIN_EMAIL.lower():
                log_pass("GET /api/auth/me with token", f"Admin info: {data.get('name')}")
            else:
                log_fail("GET /api/auth/me with token", f"Invalid admin data: {data}")
        else:
            log_fail("GET /api/auth/me with token", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("GET /api/auth/me with token", f"Exception: {str(e)}")
    
    # Test 2b: Without token
    try:
        response = requests.get(
            f"{BASE_URL}/auth/me",
            headers=get_headers(with_auth=False)
        )
        
        if response.status_code == 401:
            log_pass("GET /api/auth/me without token returns 401")
        else:
            log_fail("GET /api/auth/me without token", f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_fail("GET /api/auth/me without token", f"Exception: {str(e)}")


# ============================================================================
# TEST 3: Public Content Endpoints - Singletons
# ============================================================================
def test_public_singletons():
    """Test GET /api/content/site and /api/content/about-galleries"""
    print("\n" + "="*80)
    print("TEST 3: Public Content - Singletons")
    print("="*80)
    
    # Test 3a: Site settings
    try:
        response = requests.get(f"{BASE_URL}/content/site")
        if response.status_code == 200:
            data = response.json()
            required_fields = ["email", "phone", "address", "socials", "nivilabsUrl"]
            missing = [f for f in required_fields if f not in data]
            if not missing and data:
                log_pass("GET /api/content/site", f"Has all required fields")
            elif missing:
                log_fail("GET /api/content/site", f"Missing fields: {missing}")
            else:
                log_fail("GET /api/content/site", "Empty response")
        else:
            log_fail("GET /api/content/site", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("GET /api/content/site", f"Exception: {str(e)}")
    
    # Test 3b: About galleries
    try:
        response = requests.get(f"{BASE_URL}/content/about-galleries")
        if response.status_code == 200:
            data = response.json()
            if "team" in data and "culture" in data:
                team = data["team"]
                culture = data["culture"]
                if "images" in team and "images" in culture:
                    log_pass("GET /api/content/about-galleries", 
                            f"Team: {len(team['images'])} images, Culture: {len(culture['images'])} images")
                else:
                    log_fail("GET /api/content/about-galleries", "Missing images in team or culture")
            else:
                log_fail("GET /api/content/about-galleries", "Missing team or culture")
        else:
            log_fail("GET /api/content/about-galleries", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("GET /api/content/about-galleries", f"Exception: {str(e)}")


# ============================================================================
# TEST 4: Public Content Endpoints - Collections
# ============================================================================
def test_public_collections():
    """Test all public collection endpoints"""
    print("\n" + "="*80)
    print("TEST 4: Public Content - Collections")
    print("="*80)
    
    collections = [
        ("hero-slides", "order"),
        ("stats", "order"),
        ("services", "order"),
        ("solutions", "order"),
        ("tech-platforms", "order"),
        ("omics-categories", "order"),
        ("values", "order"),
        ("leadership", "order"),
        ("clients", "order"),
        ("testimonials", "order"),
        ("publications", "year")
    ]
    
    for resource, sort_field in collections:
        try:
            response = requests.get(f"{BASE_URL}/content/{resource}")
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) > 0:
                    # Check sorting
                    if sort_field in data[0]:
                        values = [item.get(sort_field) for item in data if sort_field in item]
                        if resource == "publications":
                            # Publications sorted by year DESC
                            is_sorted = all(values[i] >= values[i+1] for i in range(len(values)-1))
                        else:
                            # Others sorted by order ASC
                            is_sorted = all(values[i] <= values[i+1] for i in range(len(values)-1))
                        
                        if is_sorted:
                            log_pass(f"GET /api/content/{resource}", 
                                    f"{len(data)} items, sorted by {sort_field}")
                        else:
                            log_fail(f"GET /api/content/{resource}", 
                                    f"Not sorted correctly by {sort_field}")
                    else:
                        log_warning(f"GET /api/content/{resource}", 
                                   f"{len(data)} items, but missing {sort_field} field")
                else:
                    log_fail(f"GET /api/content/{resource}", "Empty or non-array response")
            else:
                log_fail(f"GET /api/content/{resource}", 
                        f"Status {response.status_code}: {response.text}")
        except Exception as e:
            log_fail(f"GET /api/content/{resource}", f"Exception: {str(e)}")


# ============================================================================
# TEST 5: Admin-only resources should return 404 on public endpoint
# ============================================================================
def test_admin_only_public_access():
    """Test that admin-only resources return 404 on public endpoint"""
    print("\n" + "="*80)
    print("TEST 5: Admin-only resources via public endpoint")
    print("="*80)
    
    admin_only = ["contact-submissions", "newsletter-subscribers"]
    
    for resource in admin_only:
        try:
            response = requests.get(f"{BASE_URL}/content/{resource}")
            if response.status_code == 404:
                log_pass(f"GET /api/content/{resource} returns 404 (admin_only)")
            else:
                log_fail(f"GET /api/content/{resource}", 
                        f"Expected 404, got {response.status_code}")
        except Exception as e:
            log_fail(f"GET /api/content/{resource}", f"Exception: {str(e)}")


# ============================================================================
# TEST 6: Unknown resource returns 404
# ============================================================================
def test_unknown_resource():
    """Test that unknown resource returns 404"""
    print("\n" + "="*80)
    print("TEST 6: Unknown resource")
    print("="*80)
    
    try:
        response = requests.get(f"{BASE_URL}/content/unknown-thing")
        if response.status_code == 404:
            log_pass("GET /api/content/unknown-thing returns 404")
        else:
            log_fail("GET /api/content/unknown-thing", 
                    f"Expected 404, got {response.status_code}")
    except Exception as e:
        log_fail("GET /api/content/unknown-thing", f"Exception: {str(e)}")


# ============================================================================
# TEST 7: Contact form submission
# ============================================================================
def test_contact_submission():
    """Test POST /api/contact and verify in admin endpoint"""
    print("\n" + "="*80)
    print("TEST 7: Contact form submission")
    print("="*80)
    
    contact_id = None
    
    # Test 7a: Submit contact form
    try:
        contact_data = {
            "name": "Dr. Priya Sharma",
            "email": "priya.sharma@research.edu",
            "org": "National Institute of Genomics",
            "phone": "+91 98765 43210",
            "subject": "Collaboration Inquiry",
            "message": "We are interested in your whole genome sequencing services for our rice breeding program."
        }
        
        response = requests.post(
            f"{BASE_URL}/contact",
            json=contact_data,
            headers=get_headers()
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") and "id" in data:
                contact_id = data["id"]
                log_pass("POST /api/contact", f"Submission saved with id: {contact_id}")
            else:
                log_fail("POST /api/contact", f"Invalid response: {data}")
        else:
            log_fail("POST /api/contact", f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("POST /api/contact", f"Exception: {str(e)}")
    
    # Test 7b: Verify submission in admin endpoint
    if contact_id:
        try:
            response = requests.get(
                f"{BASE_URL}/admin/contact-submissions",
                headers=get_headers(with_auth=True)
            )
            
            if response.status_code == 200:
                data = response.json()
                found = any(item.get("id") == contact_id for item in data)
                if found:
                    log_pass("GET /api/admin/contact-submissions", 
                            f"New submission {contact_id} found")
                else:
                    log_fail("GET /api/admin/contact-submissions", 
                            f"Submission {contact_id} not found in list")
            else:
                log_fail("GET /api/admin/contact-submissions", 
                        f"Status {response.status_code}: {response.text}")
        except Exception as e:
            log_fail("GET /api/admin/contact-submissions", f"Exception: {str(e)}")


# ============================================================================
# TEST 8: Newsletter subscription
# ============================================================================
def test_newsletter_subscription():
    """Test POST /api/newsletter with duplicate detection"""
    print("\n" + "="*80)
    print("TEST 8: Newsletter subscription")
    print("="*80)
    
    test_email = "test.researcher@genomics.edu"
    
    # Test 8a: First subscription
    try:
        response = requests.post(
            f"{BASE_URL}/newsletter",
            json={"email": test_email},
            headers=get_headers()
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") and "id" in data and not data.get("already"):
                log_pass("POST /api/newsletter (first time)", 
                        f"Subscription saved with id: {data['id']}")
            else:
                log_warning("POST /api/newsletter (first time)", 
                           f"Unexpected response: {data}")
        else:
            log_fail("POST /api/newsletter (first time)", 
                    f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("POST /api/newsletter (first time)", f"Exception: {str(e)}")
    
    # Test 8b: Duplicate subscription
    try:
        response = requests.post(
            f"{BASE_URL}/newsletter",
            json={"email": test_email},
            headers=get_headers()
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") and data.get("already") is True:
                log_pass("POST /api/newsletter (duplicate)", 
                        "Returns already:true for duplicate email")
            else:
                log_fail("POST /api/newsletter (duplicate)", 
                        f"Expected already:true, got: {data}")
        else:
            log_fail("POST /api/newsletter (duplicate)", 
                    f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail("POST /api/newsletter (duplicate)", f"Exception: {str(e)}")


# ============================================================================
# TEST 9: Admin CRUD operations
# ============================================================================
def test_admin_crud():
    """Test admin CRUD on testimonials and publications"""
    print("\n" + "="*80)
    print("TEST 9: Admin CRUD operations")
    print("="*80)
    
    # Test on testimonials
    test_admin_crud_resource("testimonials", {
        "quote": "Bionivid's SQIT platform revolutionized our NGS data analysis workflow. Highly recommended!",
        "name": "Dr. Arun Patel",
        "role": "Senior Bioinformatician, ICAR",
        "order": 999
    })
    
    # Test on publications
    test_admin_crud_resource("publications", {
        "year": 2026,
        "title": "Novel insights into rice genome evolution through long-read sequencing",
        "publisher": "Nature Genetics",
        "link": "https://example.com/publication"
    })


def test_admin_crud_resource(resource: str, test_data: dict):
    """Test CRUD operations on a specific resource"""
    created_id = None
    
    # Test 9a: List (with auth)
    try:
        response = requests.get(
            f"{BASE_URL}/admin/{resource}",
            headers=get_headers(with_auth=True)
        )
        
        if response.status_code == 200:
            data = response.json()
            log_pass(f"GET /api/admin/{resource} (list)", f"{len(data)} items")
        else:
            log_fail(f"GET /api/admin/{resource} (list)", 
                    f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"GET /api/admin/{resource} (list)", f"Exception: {str(e)}")
    
    # Test 9b: List without auth should return 401
    try:
        response = requests.get(
            f"{BASE_URL}/admin/{resource}",
            headers=get_headers(with_auth=False)
        )
        
        if response.status_code == 401:
            log_pass(f"GET /api/admin/{resource} without auth returns 401")
        else:
            log_fail(f"GET /api/admin/{resource} without auth", 
                    f"Expected 401, got {response.status_code}")
    except Exception as e:
        log_fail(f"GET /api/admin/{resource} without auth", f"Exception: {str(e)}")
    
    # Test 9c: Create
    try:
        response = requests.post(
            f"{BASE_URL}/admin/{resource}",
            json=test_data,
            headers=get_headers(with_auth=True)
        )
        
        if response.status_code == 200:
            data = response.json()
            if "id" in data:
                created_id = data["id"]
                log_pass(f"POST /api/admin/{resource} (create)", f"Created with id: {created_id}")
            else:
                log_fail(f"POST /api/admin/{resource} (create)", "No id in response")
        else:
            log_fail(f"POST /api/admin/{resource} (create)", 
                    f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"POST /api/admin/{resource} (create)", f"Exception: {str(e)}")
    
    if not created_id:
        return
    
    # Test 9d: Get by ID
    try:
        response = requests.get(
            f"{BASE_URL}/admin/{resource}/{created_id}",
            headers=get_headers(with_auth=True)
        )
        
        if response.status_code == 200:
            data = response.json()
            if data.get("id") == created_id:
                log_pass(f"GET /api/admin/{resource}/{{id}}", f"Retrieved item {created_id}")
            else:
                log_fail(f"GET /api/admin/{resource}/{{id}}", "ID mismatch")
        else:
            log_fail(f"GET /api/admin/{resource}/{{id}}", 
                    f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"GET /api/admin/{resource}/{{id}}", f"Exception: {str(e)}")
    
    # Test 9e: Update
    try:
        update_data = dict(test_data)
        if resource == "testimonials":
            update_data["quote"] = "UPDATED: " + update_data["quote"]
        elif resource == "publications":
            update_data["title"] = "UPDATED: " + update_data["title"]
        
        response = requests.put(
            f"{BASE_URL}/admin/{resource}/{created_id}",
            json=update_data,
            headers=get_headers(with_auth=True)
        )
        
        if response.status_code == 200:
            data = response.json()
            # Verify update persisted
            if resource == "testimonials" and "UPDATED:" in data.get("quote", ""):
                log_pass(f"PUT /api/admin/{resource}/{{id}}", "Update persisted")
            elif resource == "publications" and "UPDATED:" in data.get("title", ""):
                log_pass(f"PUT /api/admin/{resource}/{{id}}", "Update persisted")
            else:
                log_fail(f"PUT /api/admin/{resource}/{{id}}", "Update not reflected")
        else:
            log_fail(f"PUT /api/admin/{resource}/{{id}}", 
                    f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"PUT /api/admin/{resource}/{{id}}", f"Exception: {str(e)}")
    
    # Test 9f: Delete
    try:
        response = requests.delete(
            f"{BASE_URL}/admin/{resource}/{created_id}",
            headers=get_headers(with_auth=True)
        )
        
        if response.status_code == 200:
            # Verify deletion by trying to get
            get_response = requests.get(
                f"{BASE_URL}/admin/{resource}/{created_id}",
                headers=get_headers(with_auth=True)
            )
            if get_response.status_code == 404:
                log_pass(f"DELETE /api/admin/{resource}/{{id}}", 
                        "Deleted successfully, GET returns 404")
            else:
                log_fail(f"DELETE /api/admin/{resource}/{{id}}", 
                        "Item still exists after delete")
        else:
            log_fail(f"DELETE /api/admin/{resource}/{{id}}", 
                    f"Status {response.status_code}: {response.text}")
    except Exception as e:
        log_fail(f"DELETE /api/admin/{resource}/{{id}}", f"Exception: {str(e)}")


# ============================================================================
# TEST 10: Singleton updates
# ============================================================================
def test_singleton_updates():
    """Test PUT /api/admin/site and /api/admin/about-galleries"""
    print("\n" + "="*80)
    print("TEST 10: Singleton updates")
    print("="*80)
    
    # Test 10a: Update site settings
    try:
        # Get current site
        response = requests.get(
            f"{BASE_URL}/admin/site",
            headers=get_headers(with_auth=True)
        )
        
        if response.status_code == 200:
            site_data = response.json()
            original_phone = site_data.get("phone")
            
            # Update phone
            site_data["phone"] = "+91 999 888 7777"
            
            update_response = requests.put(
                f"{BASE_URL}/admin/site",
                json=site_data,
                headers=get_headers(with_auth=True)
            )
            
            if update_response.status_code == 200:
                updated_data = update_response.json()
                if updated_data.get("phone") == "+91 999 888 7777":
                    log_pass("PUT /api/admin/site", "Phone updated successfully")
                    
                    # Restore original
                    site_data["phone"] = original_phone
                    requests.put(
                        f"{BASE_URL}/admin/site",
                        json=site_data,
                        headers=get_headers(with_auth=True)
                    )
                else:
                    log_fail("PUT /api/admin/site", "Update not reflected")
            else:
                log_fail("PUT /api/admin/site", 
                        f"Status {update_response.status_code}: {update_response.text}")
        else:
            log_fail("PUT /api/admin/site", f"Could not get current site data")
    except Exception as e:
        log_fail("PUT /api/admin/site", f"Exception: {str(e)}")
    
    # Test 10b: Update about galleries
    try:
        # Get current galleries
        response = requests.get(
            f"{BASE_URL}/admin/about-galleries",
            headers=get_headers(with_auth=True)
        )
        
        if response.status_code == 200:
            galleries_data = response.json()
            original_title = galleries_data.get("team", {}).get("title")
            
            # Update team title
            if "team" not in galleries_data:
                galleries_data["team"] = {}
            galleries_data["team"]["title"] = "UPDATED Team Title"
            
            update_response = requests.put(
                f"{BASE_URL}/admin/about-galleries",
                json=galleries_data,
                headers=get_headers(with_auth=True)
            )
            
            if update_response.status_code == 200:
                updated_data = update_response.json()
                if updated_data.get("team", {}).get("title") == "UPDATED Team Title":
                    log_pass("PUT /api/admin/about-galleries", "Team title updated successfully")
                    
                    # Restore original
                    galleries_data["team"]["title"] = original_title
                    requests.put(
                        f"{BASE_URL}/admin/about-galleries",
                        json=galleries_data,
                        headers=get_headers(with_auth=True)
                    )
                else:
                    log_fail("PUT /api/admin/about-galleries", "Update not reflected")
            else:
                log_fail("PUT /api/admin/about-galleries", 
                        f"Status {update_response.status_code}: {update_response.text}")
        else:
            log_fail("PUT /api/admin/about-galleries", "Could not get current galleries data")
    except Exception as e:
        log_fail("PUT /api/admin/about-galleries", f"Exception: {str(e)}")


# ============================================================================
# Main test runner
# ============================================================================
def main():
    """Run all tests"""
    print("\n" + "="*80)
    print("BIONIVID HEADLESS CMS - BACKEND TEST SUITE")
    print("="*80)
    print(f"Base URL: {BASE_URL}")
    print(f"Admin: {ADMIN_EMAIL}")
    print("="*80)
    
    # Run all tests in order
    test_auth_login()
    test_auth_me()
    test_public_singletons()
    test_public_collections()
    test_admin_only_public_access()
    test_unknown_resource()
    test_contact_submission()
    test_newsletter_subscription()
    test_admin_crud()
    test_singleton_updates()
    
    # Print summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    print(f"✅ Passed: {len(test_results['passed'])}")
    print(f"❌ Failed: {len(test_results['failed'])}")
    print(f"⚠️  Warnings: {len(test_results['warnings'])}")
    
    if test_results['failed']:
        print("\n" + "="*80)
        print("FAILED TESTS:")
        print("="*80)
        for failure in test_results['failed']:
            print(f"  ❌ {failure}")
    
    if test_results['warnings']:
        print("\n" + "="*80)
        print("WARNINGS:")
        print("="*80)
        for warning in test_results['warnings']:
            print(f"  ⚠️  {warning}")
    
    print("\n" + "="*80)
    
    # Exit with appropriate code
    sys.exit(0 if len(test_results['failed']) == 0 else 1)


if __name__ == "__main__":
    main()
