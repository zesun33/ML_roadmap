#!/usr/bin/env python3
"""
Add the absolute final 6 missing NeetCode 150 problems
"""

import json
from pathlib import Path

remaining_6 = [
    {
        "name": "Merge k Sorted Lists",
        "difficulty": "Hard",
        "leetcode_url": "https://leetcode.com/problems/merge-k-sorted-lists/",
        "neetcode_url": "https://neetcode.io/problems/merge-k-sorted-linked-lists",
        "description": "Merge multiple sorted linked lists efficiently",
        "ai_prompt": "How does k-way merging relate to distributed data processing in ML?"
    },
    {
        "name": "Design Add and Search Words Data Structure",
        "difficulty": "Medium", 
        "leetcode_url": "https://leetcode.com/problems/design-add-and-search-words-data-structure/",
        "neetcode_url": "https://neetcode.io/problems/design-word-search-data-structure",
        "description": "Trie with wildcard search functionality",
        "ai_prompt": "How does wildcard search relate to fuzzy matching in ML applications?"
    },
    {
        "name": "Kth Largest Element in a Stream",
        "difficulty": "Easy",
        "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
        "neetcode_url": "https://neetcode.io/problems/kth-largest-integer-in-a-stream",
        "description": "Maintain kth largest in streaming data",
        "ai_prompt": "How does streaming kth largest relate to online learning algorithms?"
    },
    {
        "name": "Last Stone Weight",
        "difficulty": "Easy",
        "leetcode_url": "https://leetcode.com/problems/last-stone-weight/",
        "neetcode_url": "https://neetcode.io/problems/last-stone-weight",
        "description": "Heap-based simulation problem",
        "ai_prompt": "How does priority-based processing relate to task scheduling in ML pipelines?"
    },
    {
        "name": "K Closest Points to Origin",
        "difficulty": "Medium",
        "leetcode_url": "https://leetcode.com/problems/k-closest-points-to-origin/",
        "neetcode_url": "https://neetcode.io/problems/k-closest-points-to-origin",
        "description": "Find k closest points using heap",
        "ai_prompt": "How does k-nearest selection relate to KNN algorithms in ML?"
    },
    {
        "name": "Kth Largest Element in an Array",
        "difficulty": "Medium",
        "leetcode_url": "https://leetcode.com/problems/kth-largest-element-in-an-array/",
        "neetcode_url": "https://neetcode.io/problems/kth-largest-element-in-an-array",
        "description": "Find kth largest using quickselect or heap",
        "ai_prompt": "How does selection algorithms relate to feature selection in ML?"
    }
]

def add_to_week_8():
    """Add remaining problems to week 8"""
    week_file = Path("app/roadmap_data/week-8.json")
    
    with open(week_file, 'r') as f:
        week_data = json.load(f)
    
    # Add to Wednesday's coding session
    sessions = week_data.get("week", {}).get("daily_schedule", {})
    
    if "wednesday" in sessions and "coding_session" in sessions["wednesday"]:
        if "problems" not in sessions["wednesday"]["coding_session"]:
            sessions["wednesday"]["coding_session"]["problems"] = []
        
        sessions["wednesday"]["coding_session"]["problems"].extend(remaining_6)
        
        print(f"✅ Added {len(remaining_6)} final problems to Week 8")
        
        # Save updated week data
        with open(week_file, 'w') as f:
            json.dump(week_data, f, indent=2)
    
def main():
    print("🏁 Adding the absolute final 6 NeetCode 150 problems...")
    add_to_week_8()
    print("🎯 Should now have 100% coverage with no missing problems!")

if __name__ == "__main__":
    main() 