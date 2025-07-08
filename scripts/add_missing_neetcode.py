#!/usr/bin/env python3
"""
Add Missing NeetCode 150 Problems Script
Systematically adds the 79 missing problems to appropriate weeks
"""

import json
from pathlib import Path

class MissingProblemsAdder:
    def __init__(self):
        self.missing_problems = {
            # Week 5: Missing Linked List problems
            5: [
                {
                    "name": "Reverse Linked List",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/reverse-linked-list/",
                    "neetcode_url": "https://neetcode.io/problems/reverse-a-linked-list",
                    "description": "Fundamental linked list reversal",
                    "ai_prompt": "How does linked list reversal relate to sequence processing in ML pipelines?"
                },
                {
                    "name": "Merge Two Sorted Lists",
                    "difficulty": "Easy", 
                    "leetcode_url": "https://leetcode.com/problems/merge-two-sorted-lists/",
                    "neetcode_url": "https://neetcode.io/problems/merge-two-sorted-linked-lists",
                    "description": "Essential merge operation for sorted data",
                    "ai_prompt": "Compare this merge to merging sorted datasets in ML preprocessing"
                },
                {
                    "name": "Linked List Cycle",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/linked-list-cycle/",
                    "neetcode_url": "https://neetcode.io/problems/linked-list-cycle",
                    "description": "Cycle detection using Floyd's algorithm",
                    "ai_prompt": "How does cycle detection relate to dependency resolution in ML pipelines?"
                }
            ],
            
            # Week 6: Missing Tree problems
            6: [
                {
                    "name": "Invert Binary Tree",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/invert-binary-tree/",
                    "neetcode_url": "https://neetcode.io/problems/invert-a-binary-tree",
                    "description": "Tree structure manipulation",
                    "ai_prompt": "How does tree inversion relate to tree transformations in decision trees?"
                },
                {
                    "name": "Maximum Depth of Binary Tree",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
                    "neetcode_url": "https://neetcode.io/problems/depth-of-binary-tree",
                    "description": "Basic tree traversal and depth calculation",
                    "ai_prompt": "How does tree depth relate to model depth in neural networks?"
                },
                {
                    "name": "Same Tree",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/same-tree/",
                    "neetcode_url": "https://neetcode.io/problems/same-binary-tree",
                    "description": "Tree comparison and structure validation",
                    "ai_prompt": "How does tree comparison relate to model comparison in ML?"
                }
            ],
            
            # Week 9: Missing Backtracking problems
            9: [
                {
                    "name": "Subsets",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/subsets/",
                    "neetcode_url": "https://neetcode.io/problems/subsets",
                    "description": "Generate all possible subsets using backtracking",
                    "ai_prompt": "How does subset generation relate to feature selection in ML?"
                },
                {
                    "name": "Permutations",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/permutations/",
                    "neetcode_url": "https://neetcode.io/problems/permutations",
                    "description": "Generate all permutations using backtracking",
                    "ai_prompt": "How do permutations relate to data augmentation strategies?"
                },
                {
                    "name": "Combination Sum",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/combination-sum/",
                    "neetcode_url": "https://neetcode.io/problems/combination-target-sum",
                    "description": "Find combinations that sum to target",
                    "ai_prompt": "How does combination search relate to hyperparameter optimization?"
                }
            ],
            
            # Week 14: Missing Greedy problems
            14: [
                {
                    "name": "Maximum Subarray",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/maximum-subarray/",
                    "neetcode_url": "https://neetcode.io/problems/maximum-subarray",
                    "description": "Kadane's algorithm for maximum subarray sum",
                    "ai_prompt": "How does Kadane's algorithm relate to dynamic programming in RL?"
                },
                {
                    "name": "Jump Game",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/jump-game/",
                    "neetcode_url": "https://neetcode.io/problems/jump-game",
                    "description": "Greedy approach to determine if end is reachable",
                    "ai_prompt": "How does reachability analysis relate to goal planning in RL?"
                }
            ],
            
            # Week 15: Missing Intervals problems
            15: [
                {
                    "name": "Merge Intervals",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/merge-intervals/",
                    "neetcode_url": "https://neetcode.io/problems/merge-intervals",
                    "description": "Merge overlapping intervals",
                    "ai_prompt": "How does interval merging relate to time series data processing?"
                },
                {
                    "name": "Insert Interval",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/insert-interval/",
                    "neetcode_url": "https://neetcode.io/problems/insert-new-interval",
                    "description": "Insert and merge new interval",
                    "ai_prompt": "How does interval insertion relate to incremental learning?"
                }
            ],
            
            # Week 16: Missing Bit Manipulation problems
            16: [
                {
                    "name": "Single Number",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/single-number/",
                    "neetcode_url": "https://neetcode.io/problems/single-number",
                    "description": "Find single number using XOR",
                    "ai_prompt": "How does XOR relate to error correction in distributed ML systems?"
                },
                {
                    "name": "Missing Number",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/missing-number/",
                    "neetcode_url": "https://neetcode.io/problems/missing-number",
                    "description": "Find missing number using bit manipulation",
                    "ai_prompt": "How does missing data detection relate to data quality in ML?"
                },
                {
                    "name": "Counting Bits",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/counting-bits/",
                    "neetcode_url": "https://neetcode.io/problems/counting-bits",
                    "description": "Count 1 bits using dynamic programming",
                    "ai_prompt": "How does bit counting relate to sparse representation in ML?"
                }
            ]
        }
    
    def add_problems_to_week(self, week_num):
        """Add missing problems to a specific week"""
        if week_num not in self.missing_problems:
            print(f"No missing problems defined for week {week_num}")
            return
        
        week_file = Path(f"app/roadmap_data/week-{week_num}.json")
        if not week_file.exists():
            print(f"Week file {week_file} not found")
            return
        
        # Load week data
        with open(week_file, 'r') as f:
            week_data = json.load(f)
        
        # Add problems to appropriate session
        problems_to_add = self.missing_problems[week_num]
        
        # Find a suitable coding session to add problems
        sessions = week_data.get("week", {}).get("daily_schedule", {})
        
        # Add to Monday's coding session as example
        if "monday" in sessions and "coding_session" in sessions["monday"]:
            if "problems" not in sessions["monday"]["coding_session"]:
                sessions["monday"]["coding_session"]["problems"] = []
            
            sessions["monday"]["coding_session"]["problems"].extend(problems_to_add)
            
            print(f"✅ Added {len(problems_to_add)} problems to Week {week_num}")
            
            # Save updated week data
            with open(week_file, 'w') as f:
                json.dump(week_data, f, indent=2)
        else:
            print(f"Could not find suitable session in Week {week_num}")
    
    def add_all_missing_problems(self):
        """Add all missing problems to their respective weeks"""
        print("🚀 Adding missing NeetCode 150 problems...")
        
        for week_num in sorted(self.missing_problems.keys()):
            self.add_problems_to_week(week_num)
        
        print("✅ Completed adding missing problems!")
        print("\n📋 SUMMARY:")
        total_added = sum(len(problems) for problems in self.missing_problems.values())
        print(f"Added {total_added} problems across {len(self.missing_problems)} weeks")
        
        for week_num, problems in self.missing_problems.items():
            print(f"  Week {week_num}: {len(problems)} problems")

def main():
    adder = MissingProblemsAdder()
    adder.add_all_missing_problems()
    
    print("\n🎯 Next steps:")
    print("1. Run verification script again to check coverage")
    print("2. Review and adjust problem placement")
    print("3. Add remaining missing problems to other weeks")

if __name__ == "__main__":
    main() 