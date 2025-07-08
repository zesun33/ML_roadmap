#!/usr/bin/env python3
"""
Add Final Missing NeetCode 150 Problems
Adds the remaining 14 problems to achieve 100% coverage
"""

import json
from pathlib import Path

class FinalProblemsAdder:
    def __init__(self):
        self.final_missing = {
            # Week 5: Additional Linked List problems
            5: [
                {
                    "name": "Reorder List",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/reorder-list/",
                    "neetcode_url": "https://neetcode.io/problems/reorder-linked-list",
                    "description": "Complex linked list manipulation",
                    "ai_prompt": "How does list reordering relate to data shuffling in ML training?"
                },
                {
                    "name": "Remove Nth Node From End of List",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
                    "neetcode_url": "https://neetcode.io/problems/remove-node-from-end-of-linked-list",
                    "description": "Two-pointer technique for linked lists",
                    "ai_prompt": "How does two-pointer removal relate to sliding window operations?"
                },
                {
                    "name": "Add Two Numbers",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/add-two-numbers/",
                    "neetcode_url": "https://neetcode.io/problems/add-two-numbers",
                    "description": "Arithmetic on linked list representation",
                    "ai_prompt": "How does digit-wise addition relate to vectorized operations in ML?"
                }
            ],
            
            # Week 6: Additional Tree problems
            6: [
                {
                    "name": "Diameter of Binary Tree",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/diameter-of-binary-tree/",
                    "neetcode_url": "https://neetcode.io/problems/binary-tree-diameter",
                    "description": "Calculate longest path in tree",
                    "ai_prompt": "How does tree diameter relate to network analysis in graph ML?"
                },
                {
                    "name": "Balanced Binary Tree",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/balanced-binary-tree/",
                    "neetcode_url": "https://neetcode.io/problems/balanced-binary-tree",
                    "description": "Check if tree is height-balanced",
                    "ai_prompt": "How does tree balance relate to model stability in ML?"
                },
                {
                    "name": "Subtree of Another Tree",
                    "difficulty": "Easy",
                    "leetcode_url": "https://leetcode.com/problems/subtree-of-another-tree/",
                    "neetcode_url": "https://neetcode.io/problems/subtree-of-a-binary-tree",
                    "description": "Check if one tree is subtree of another",
                    "ai_prompt": "How does subtree detection relate to pattern matching in data structures?"
                }
            ],
            
            # Week 7: More Tree problems
            7: [
                {
                    "name": "Lowest Common Ancestor of a Binary Search Tree",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
                    "neetcode_url": "https://neetcode.io/problems/lowest-common-ancestor-in-binary-search-tree",
                    "description": "LCA in BST using properties",
                    "ai_prompt": "How does LCA relate to hierarchical clustering in ML?"
                },
                {
                    "name": "Binary Tree Level Order Traversal",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/binary-tree-level-order-traversal/",
                    "neetcode_url": "https://neetcode.io/problems/binary-tree-level-order-traversal",
                    "description": "BFS traversal of binary tree",
                    "ai_prompt": "How does level-order traversal relate to layer-wise processing in neural networks?"
                },
                {
                    "name": "Binary Tree Right Side View",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/binary-tree-right-side-view/",
                    "neetcode_url": "https://neetcode.io/problems/binary-tree-right-side-view",
                    "description": "Get rightmost nodes at each level",
                    "ai_prompt": "How does selective node viewing relate to attention mechanisms?"
                }
            ],
            
            # Week 8: Additional problems
            8: [
                {
                    "name": "Count Good Nodes in Binary Tree",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
                    "neetcode_url": "https://neetcode.io/problems/count-good-nodes-in-binary-tree",
                    "description": "Count nodes with no larger ancestors",
                    "ai_prompt": "How does path-dependent counting relate to sequential decision making?"
                },
                {
                    "name": "Construct Binary Tree from Preorder and Inorder Traversal",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
                    "neetcode_url": "https://neetcode.io/problems/build-binary-tree-from-preorder-and-inorder-traversal",
                    "description": "Reconstruct tree from traversals",
                    "ai_prompt": "How does tree reconstruction relate to model architecture search?"
                },
                {
                    "name": "Implement Trie (Prefix Tree)",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/implement-trie-prefix-tree/",
                    "neetcode_url": "https://neetcode.io/problems/implement-prefix-tree",
                    "description": "Implement prefix tree data structure",
                    "ai_prompt": "How does trie implementation relate to tokenization in NLP?"
                }
            ],
            
            # Week 17: Final missing problems
            17: [
                {
                    "name": "Copy List with Random Pointer",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/copy-list-with-random-pointer/",
                    "neetcode_url": "https://neetcode.io/problems/copy-linked-list-with-random-pointer",
                    "description": "Deep copy linked list with random pointers",
                    "ai_prompt": "How does deep copying relate to model cloning in ML?"
                },
                {
                    "name": "Find the Duplicate Number",
                    "difficulty": "Medium",
                    "leetcode_url": "https://leetcode.com/problems/find-the-duplicate-number/",
                    "neetcode_url": "https://neetcode.io/problems/find-duplicate-integer",
                    "description": "Find duplicate using Floyd's cycle detection",
                    "ai_prompt": "How does duplicate detection relate to data quality in ML pipelines?"
                },
                {
                    "name": "Reverse Nodes in k-Group",
                    "difficulty": "Hard",
                    "leetcode_url": "https://leetcode.com/problems/reverse-nodes-in-k-group/",
                    "neetcode_url": "https://neetcode.io/problems/reverse-nodes-in-k-group",
                    "description": "Advanced linked list manipulation",
                    "ai_prompt": "How does k-group reversal relate to batch processing in ML?"
                }
            ]
        }
    
    def add_problems_to_week(self, week_num):
        """Add final missing problems to a specific week"""
        if week_num not in self.final_missing:
            return
        
        week_file = Path(f"app/roadmap_data/week-{week_num}.json")
        if not week_file.exists():
            print(f"Week file {week_file} not found")
            return
        
        # Load week data
        with open(week_file, 'r') as f:
            week_data = json.load(f)
        
        problems_to_add = self.final_missing[week_num]
        
        # Find Tuesday's coding session to add more problems
        sessions = week_data.get("week", {}).get("daily_schedule", {})
        
        if "tuesday" in sessions and "coding_session" in sessions["tuesday"]:
            if "problems" not in sessions["tuesday"]["coding_session"]:
                sessions["tuesday"]["coding_session"]["problems"] = []
            
            sessions["tuesday"]["coding_session"]["problems"].extend(problems_to_add)
            
            print(f"✅ Added {len(problems_to_add)} problems to Week {week_num}")
            
            # Save updated week data
            with open(week_file, 'w') as f:
                json.dump(week_data, f, indent=2)
        else:
            print(f"Could not find Tuesday session in Week {week_num}")
    
    def add_all_final_problems(self):
        """Add all final missing problems"""
        print("🎯 Adding final 14 missing NeetCode 150 problems for 100% coverage...")
        
        for week_num in sorted(self.final_missing.keys()):
            self.add_problems_to_week(week_num)
        
        print("✅ Completed adding final missing problems!")
        
        total_added = sum(len(problems) for problems in self.final_missing.values())
        print(f"\n📋 FINAL SUMMARY:")
        print(f"Added {total_added} problems across {len(self.final_missing)} weeks")
        
        for week_num, problems in self.final_missing.items():
            print(f"  Week {week_num}: {len(problems)} problems")

def main():
    adder = FinalProblemsAdder()
    adder.add_all_final_problems()
    
    print("\n🏆 Expected Result: 100% NeetCode 150 Coverage!")
    print("🔄 Run verification script to confirm complete coverage")

if __name__ == "__main__":
    main() 