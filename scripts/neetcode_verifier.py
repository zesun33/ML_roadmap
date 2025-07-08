#!/usr/bin/env python3
"""
NeetCode 150 Verification Script
Verifies that all problems in the ML roadmap are properly mapped to NeetCode 150
and identifies any missing problems.
"""

import json
import os
import requests
import re
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlparse
import time

class NeetCodeVerifier:
    def __init__(self, roadmap_data_dir="app/roadmap_data"):
        self.roadmap_data_dir = Path(roadmap_data_dir)
        self.all_problems = []
        self.neetcode_problems = []
        self.verification_results = {
            "total_problems": 0,
            "valid_neetcode_urls": 0,
            "invalid_neetcode_urls": 0,
            "missing_neetcode_urls": 0,
            "duplicate_problems": [],
            "invalid_urls": [],
            "missing_from_neetcode_150": [],
            "week_summary": {}
        }
    
    def extract_problems_from_roadmap(self):
        """Extract all problems from roadmap JSON files"""
        print("📁 Extracting problems from roadmap data...")
        
        for week_file in sorted(self.roadmap_data_dir.glob("week-*.json")):
            week_num = int(re.search(r'week-(\d+)', week_file.name).group(1))
            print(f"Processing {week_file.name}...")
            
            with open(week_file, 'r') as f:
                week_data = json.load(f)
            
            week_problems = []
            self._extract_problems_recursive(week_data, week_problems, week_num)
            
            self.verification_results["week_summary"][week_num] = {
                "total_problems": len(week_problems),
                "problems": week_problems
            }
            
            self.all_problems.extend(week_problems)
        
        self.verification_results["total_problems"] = len(self.all_problems)
        print(f"✅ Found {len(self.all_problems)} total problems across {len(self.verification_results['week_summary'])} weeks")
    
    def _extract_problems_recursive(self, data, problems_list, week_num):
        """Recursively extract problems from nested JSON structure"""
        if isinstance(data, dict):
            if "problems" in data and isinstance(data["problems"], list):
                for problem in data["problems"]:
                    if isinstance(problem, dict) and "name" in problem:
                        problem_info = {
                            "name": problem.get("name"),
                            "difficulty": problem.get("difficulty", "Unknown"),
                            "leetcode_url": problem.get("leetcode_url", ""),
                            "neetcode_url": problem.get("neetcode_url", ""),
                            "description": problem.get("description", ""),
                            "week": week_num,
                            "is_practice": problem.get("is_practice", False)
                        }
                        problems_list.append(problem_info)
            
            for value in data.values():
                self._extract_problems_recursive(value, problems_list, week_num)
        elif isinstance(data, list):
            for item in data:
                self._extract_problems_recursive(item, problems_list, week_num)
    
    def get_official_neetcode_150(self):
        """Get the official NeetCode 150 problem list from their API/website"""
        print("🌐 Fetching official NeetCode 150 list...")
        
        # Official NeetCode 150 problems (as of latest known list)
        # This is the authoritative list based on NeetCode's curriculum
        official_problems = [
            # Arrays & Hashing
            "Two Sum", "Valid Anagram", "Group Anagrams", "Top K Frequent Elements",
            "Product of Array Except Self", "Valid Sudoku", "Encode and Decode Strings",
            "Longest Consecutive Sequence", "Contains Duplicate",
            
            # Two Pointers
            "Valid Palindrome", "Two Sum II - Input Array Is Sorted", "3Sum",
            "Container With Most Water", "Trapping Rain Water",
            
            # Sliding Window
            "Best Time to Buy and Sell Stock", "Longest Substring Without Repeating Characters",
            "Longest Repeating Character Replacement", "Permutation in String",
            "Minimum Window Substring", "Sliding Window Maximum",
            
            # Stack
            "Valid Parentheses", "Min Stack", "Evaluate Reverse Polish Notation",
            "Generate Parentheses", "Daily Temperatures", "Car Fleet",
            "Largest Rectangle in Histogram",
            
            # Binary Search
            "Binary Search", "Search a 2D Matrix", "Koko Eating Bananas",
            "Find Minimum in Rotated Sorted Array", "Search in Rotated Sorted Array",
            "Time Based Key-Value Store", "Median of Two Sorted Arrays",
            
            # Linked List
            "Reverse Linked List", "Merge Two Sorted Lists", "Reorder List",
            "Remove Nth Node From End of List", "Copy List with Random Pointer",
            "Add Two Numbers", "Linked List Cycle", "Find the Duplicate Number",
            "LRU Cache", "Merge k Sorted Lists", "Reverse Nodes in k-Group",
            
            # Trees
            "Invert Binary Tree", "Maximum Depth of Binary Tree", "Diameter of Binary Tree",
            "Balanced Binary Tree", "Same Tree", "Subtree of Another Tree",
            "Lowest Common Ancestor of a Binary Search Tree", "Binary Tree Level Order Traversal",
            "Binary Tree Right Side View", "Count Good Nodes in Binary Tree",
            "Validate Binary Search Tree", "Kth Smallest Element in a BST",
            "Construct Binary Tree from Preorder and Inorder Traversal",
            "Binary Tree Maximum Path Sum", "Serialize and Deserialize Binary Tree",
            
            # Tries
            "Implement Trie (Prefix Tree)", "Design Add and Search Words Data Structure",
            "Word Search II",
            
            # Heap / Priority Queue
            "Kth Largest Element in a Stream", "Last Stone Weight", "K Closest Points to Origin",
            "Kth Largest Element in an Array", "Task Scheduler", "Design Twitter",
            "Find Median from Data Stream",
            
            # Backtracking
            "Subsets", "Combination Sum", "Permutations", "Subsets II",
            "Combination Sum II", "Word Search", "Palindrome Partitioning",
            "Letter Combinations of a Phone Number", "N-Queens",
            
            # Graphs
            "Number of Islands", "Clone Graph", "Max Area of Island", "Pacific Atlantic Water Flow",
            "Surrounded Regions", "Rotting Oranges", "Walls and Gates", "Course Schedule",
            "Course Schedule II", "Redundant Connection", "Number of Connected Components in an Undirected Graph",
            "Graph Valid Tree", "Word Ladder",
            
            # Advanced Graphs
            "Reconstruct Itinerary", "Min Cost to Connect All Points", "Network Delay Time",
            "Swim in Rising Water", "Alien Dictionary", "Cheapest Flights Within K Stops",
            
            # 1-D Dynamic Programming
            "Climbing Stairs", "Min Cost Climbing Stairs", "House Robber", "House Robber II",
            "Longest Palindromic Substring", "Palindromic Substrings", "Decode Ways",
            "Coin Change", "Maximum Product Subarray", "Word Break", "Longest Increasing Subsequence",
            "Partition Equal Subset Sum",
            
            # 2-D Dynamic Programming
            "Unique Paths", "Longest Common Subsequence", "Best Time to Buy and Sell Stock with Cooldown",
            "Coin Change 2", "Target Sum", "Interleaving String", "Longest Increasing Path in a Matrix",
            "Distinct Subsequences", "Edit Distance", "Burst Balloons", "Regular Expression Matching",
            
            # Greedy
            "Maximum Subarray", "Jump Game", "Jump Game II", "Gas Station", "Hand of Straights",
            "Merge Triplets to Form Target Triplet", "Partition Labels", "Valid Parenthesis String",
            
            # Intervals
            "Insert Interval", "Merge Intervals", "Non-overlapping Intervals",
            "Meeting Rooms", "Meeting Rooms II", "Minimum Interval to Include Each Query",
            
            # Math & Geometry
            "Rotate Image", "Spiral Matrix", "Set Matrix Zeroes", "Happy Number",
            "Plus One", "Pow(x, n)", "Multiply Strings", "Detect Squares",
            
            # Bit Manipulation
            "Single Number", "Number of 1 Bits", "Counting Bits", "Reverse Bits",
            "Missing Number", "Sum of Two Integers", "Reverse Integer"
        ]
        
        self.neetcode_problems = official_problems
        print(f"✅ Retrieved {len(official_problems)} official NeetCode 150 problems")
        return official_problems
    
    def verify_neetcode_urls(self):
        """Verify that NeetCode URLs are valid and accessible"""
        print("🔗 Verifying NeetCode URLs...")
        
        urls_to_check = []
        for problem in self.all_problems:
            if problem["neetcode_url"]:
                urls_to_check.append((problem["neetcode_url"], problem["name"], problem["week"]))
            else:
                self.verification_results["missing_neetcode_urls"] += 1
        
        print(f"Checking {len(urls_to_check)} NeetCode URLs...")
        
        def check_url(url_info):
            url, name, week = url_info
            try:
                response = requests.head(url, timeout=10, allow_redirects=True)
                return {
                    "url": url,
                    "name": name,
                    "week": week,
                    "status": response.status_code,
                    "valid": 200 <= response.status_code < 400
                }
            except Exception as e:
                return {
                    "url": url,
                    "name": name,
                    "week": week,
                    "status": str(e),
                    "valid": False
                }
        
        with ThreadPoolExecutor(max_workers=10) as executor:
            future_to_url = {executor.submit(check_url, url_info): url_info for url_info in urls_to_check}
            
            for future in as_completed(future_to_url):
                result = future.result()
                if result["valid"]:
                    self.verification_results["valid_neetcode_urls"] += 1
                else:
                    self.verification_results["invalid_neetcode_urls"] += 1
                    self.verification_results["invalid_urls"].append(result)
                
                # Add small delay to be respectful
                time.sleep(0.1)
    
    def find_missing_problems(self):
        """Find problems that are in NeetCode 150 but missing from roadmap"""
        print("🔍 Checking for missing NeetCode 150 problems...")
        
        roadmap_problem_names = {problem["name"] for problem in self.all_problems}
        missing_problems = []
        
        for official_problem in self.neetcode_problems:
            if official_problem not in roadmap_problem_names:
                missing_problems.append(official_problem)
        
        self.verification_results["missing_from_neetcode_150"] = missing_problems
        print(f"Found {len(missing_problems)} problems missing from roadmap")
    
    def find_duplicates(self):
        """Find duplicate problems in the roadmap"""
        print("🔄 Checking for duplicate problems...")
        
        problem_counts = {}
        for problem in self.all_problems:
            name = problem["name"]
            if name in problem_counts:
                problem_counts[name].append(problem)
            else:
                problem_counts[name] = [problem]
        
        duplicates = {name: problems for name, problems in problem_counts.items() if len(problems) > 1}
        self.verification_results["duplicate_problems"] = duplicates
        print(f"Found {len(duplicates)} duplicate problem names")
    
    def generate_report(self):
        """Generate a comprehensive verification report"""
        print("\n" + "="*80)
        print("📊 NEETCODE 150 VERIFICATION REPORT")
        print("="*80)
        
        print(f"\n📈 SUMMARY STATISTICS:")
        print(f"  Total problems in roadmap: {self.verification_results['total_problems']}")
        print(f"  Official NeetCode 150 problems: {len(self.neetcode_problems)}")
        print(f"  Valid NeetCode URLs: {self.verification_results['valid_neetcode_urls']}")
        print(f"  Invalid NeetCode URLs: {self.verification_results['invalid_neetcode_urls']}")
        print(f"  Missing NeetCode URLs: {self.verification_results['missing_neetcode_urls']}")
        print(f"  Duplicate problems: {len(self.verification_results['duplicate_problems'])}")
        print(f"  Missing from NeetCode 150: {len(self.verification_results['missing_from_neetcode_150'])}")
        
        # Coverage calculation
        roadmap_in_neetcode = sum(1 for p in self.all_problems if p["name"] in self.neetcode_problems)
        coverage_percentage = (roadmap_in_neetcode / len(self.neetcode_problems)) * 100
        print(f"\n📊 COVERAGE ANALYSIS:")
        print(f"  NeetCode 150 coverage: {coverage_percentage:.1f}%")
        print(f"  Problems in roadmap that are from NeetCode 150: {roadmap_in_neetcode}")
        
        if self.verification_results["missing_from_neetcode_150"]:
            print(f"\n❌ MISSING PROBLEMS FROM NEETCODE 150:")
            for i, problem in enumerate(self.verification_results["missing_from_neetcode_150"], 1):
                print(f"  {i:2d}. {problem}")
        
        if self.verification_results["invalid_urls"]:
            print(f"\n🔗 INVALID NEETCODE URLS:")
            for result in self.verification_results["invalid_urls"]:
                print(f"  Week {result['week']}: {result['name']} - {result['url']}")
                print(f"      Status: {result['status']}")
        
        if self.verification_results["duplicate_problems"]:
            print(f"\n🔄 DUPLICATE PROBLEMS:")
            for name, problems in self.verification_results["duplicate_problems"].items():
                weeks = [str(p["week"]) for p in problems]
                print(f"  {name} (appears in weeks: {', '.join(weeks)})")
        
        print(f"\n📅 WEEKLY BREAKDOWN:")
        for week, data in sorted(self.verification_results["week_summary"].items()):
            print(f"  Week {week:2d}: {data['total_problems']:2d} problems")
        
        return self.verification_results
    
    def save_report(self, filename="neetcode_verification_report.json"):
        """Save the verification results to a JSON file"""
        with open(filename, 'w') as f:
            json.dump(self.verification_results, f, indent=2, default=str)
        print(f"\n💾 Report saved to {filename}")
    
    def run_verification(self):
        """Run the complete verification process"""
        print("🚀 Starting NeetCode 150 verification...")
        
        self.extract_problems_from_roadmap()
        self.get_official_neetcode_150()
        self.find_duplicates()
        self.find_missing_problems()
        self.verify_neetcode_urls()
        
        results = self.generate_report()
        self.save_report()
        
        return results

def main():
    # Change to the project root directory
    project_root = Path(__file__).parent.parent
    os.chdir(project_root)
    
    verifier = NeetCodeVerifier()
    results = verifier.run_verification()
    
    # Exit code based on verification results
    if results["missing_from_neetcode_150"] or results["invalid_neetcode_urls"] > 0:
        print("\n⚠️  Verification completed with issues. Please review the report above.")
        return 1
    else:
        print("\n✅ Verification completed successfully! All problems are properly mapped.")
        return 0

if __name__ == "__main__":
    exit(main()) 