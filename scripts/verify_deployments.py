#!/usr/bin/env python3
"""
Deployment Verification Script
Verifies that both GitHub Pages and Netlify deployments are working correctly
"""

import requests
import json
import time
from urllib.parse import urljoin

class DeploymentVerifier:
    def __init__(self):
        self.deployments = {
            "GitHub Pages": "https://zesun33.github.io/ML_roadmap/",
            "Netlify": "https://ml-roadmap.netlify.app/"
        }
        self.test_endpoints = [
            "",  # Root
            "index.html",  # Main page
            "style.css",  # CSS
            "script.js",  # JavaScript
            "roadmap_data/week-1.json"  # Data file
        ]
        
    def check_url(self, url, timeout=10):
        """Check if URL is accessible and returns expected content"""
        try:
            response = requests.get(url, timeout=timeout)
            return {
                "status_code": response.status_code,
                "success": response.status_code == 200,
                "content_length": len(response.content),
                "content_type": response.headers.get("content-type", ""),
                "response_time": response.elapsed.total_seconds()
            }
        except requests.RequestException as e:
            return {
                "status_code": None,
                "success": False,
                "error": str(e),
                "response_time": timeout
            }
    
    def verify_deployment(self, name, base_url):
        """Verify a single deployment"""
        print(f"\n🔍 Testing {name}: {base_url}")
        results = {}
        
        for endpoint in self.test_endpoints:
            test_url = urljoin(base_url, endpoint)
            print(f"  Testing: {endpoint or 'root'}")
            
            result = self.check_url(test_url)
            results[endpoint] = result
            
            if result["success"]:
                print(f"    ✅ {result['status_code']} - {result['content_length']} bytes - {result['response_time']:.2f}s")
            else:
                error = result.get("error", f"HTTP {result['status_code']}")
                print(f"    ❌ Failed: {error}")
        
        return results
    
    def check_neetcode_integration(self, base_url):
        """Verify NeetCode integration is working"""
        print(f"\n🎯 Testing NeetCode Integration...")
        
        # Test if week data loads correctly
        week_url = urljoin(base_url, "roadmap_data/week-5.json")
        result = self.check_url(week_url)
        
        if result["success"]:
            try:
                response = requests.get(week_url)
                week_data = response.json()
                
                # Count NeetCode problems
                neetcode_count = 0
                total_problems = 0
                
                if "week" in week_data and "daily_schedule" in week_data["week"]:
                    for day, day_data in week_data["week"]["daily_schedule"].items():
                        if "coding_session" in day_data and "problems" in day_data["coding_session"]:
                            problems = day_data["coding_session"]["problems"]
                            total_problems += len(problems)
                            
                            for problem in problems:
                                if "neetcode_url" in problem and problem["neetcode_url"]:
                                    neetcode_count += 1
                
                print(f"    ✅ Week 5: {neetcode_count}/{total_problems} problems have NeetCode URLs")
                return True
                
            except Exception as e:
                print(f"    ❌ Error parsing week data: {e}")
                return False
        else:
            print(f"    ❌ Could not load week data")
            return False
    
    def generate_report(self, all_results):
        """Generate comprehensive deployment report"""
        report = {
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S UTC", time.gmtime()),
            "deployments": all_results,
            "summary": {
                "total_deployments": len(all_results),
                "successful_deployments": 0,
                "failed_deployments": 0
            }
        }
        
        for deployment_name, results in all_results.items():
            all_success = all(r["success"] for r in results.values())
            if all_success:
                report["summary"]["successful_deployments"] += 1
            else:
                report["summary"]["failed_deployments"] += 1
        
        return report
    
    def run_verification(self):
        """Run full deployment verification"""
        print("🚀 ML Roadmap Deployment Verification")
        print("=" * 50)
        
        all_results = {}
        
        for name, url in self.deployments.items():
            results = self.verify_deployment(name, url)
            all_results[name] = results
            
            # Test NeetCode integration for successful deployments
            if all(r["success"] for r in results.values()):
                self.check_neetcode_integration(url)
        
        # Generate and save report
        report = self.generate_report(all_results)
        
        print(f"\n📊 VERIFICATION SUMMARY:")
        print(f"  ✅ Successful: {report['summary']['successful_deployments']}")
        print(f"  ❌ Failed: {report['summary']['failed_deployments']}")
        
        # Save detailed report
        with open("deployment_verification_report.json", "w") as f:
            json.dump(report, f, indent=2)
        
        print(f"\n📄 Detailed report saved to: deployment_verification_report.json")
        
        return report["summary"]["successful_deployments"] == len(self.deployments)

def main():
    verifier = DeploymentVerifier()
    success = verifier.run_verification()
    
    if success:
        print("\n🎉 ALL DEPLOYMENTS SUCCESSFUL!")
        exit(0)
    else:
        print("\n⚠️  Some deployments failed. Check the report for details.")
        exit(1)

if __name__ == "__main__":
    main() 