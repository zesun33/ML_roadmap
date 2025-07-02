# The 16-Week Researcher-to-Engineer Roadmap

## Guiding Principles

1.  **Consistency Over Intensity:** A focused 1.5-2.5 hours every weekday and a longer session on Saturday is the goal.
2.  **AI as Your Socratic Tutor:** Ask for hints, not answers. Use it to critique, not create.
3.  **The Two-Language Mindset:** Python for speed of learning. C++ for deep dives into performance and memory.
4.  **Document Your Journey:** Keep a daily log. For each problem, note your approach, complexity, and one key takeaway.
5.  **Rest is Non-Negotiable:** Sundays are for rest. Your brain needs it to consolidate learning.

---

## Phase 1: Foundational Skills Acquisition (Weeks 1-8)

### **Week 1: Arrays & Hashing**
**Weekly Goal:** To build a deep, practical understanding of the most fundamental data structure (arrays) and the most powerful algorithmic technique for time optimization (hashing). By the end of this week, you will intuitively know when a hash map can drastically improve a solution.

*   **Monday: Concept Day - Big O and Hash Maps**
    *   **Objective:** Understand the language of efficiency (Big O) and the tool for achieving it (Hash Maps).
    *   **Task 1: Watch & Learn (Big O):** Watch NeetCode's video on [Big O Notation](https://www.youtube.com/watch?v=Mo4vesaut8g). Your goal is not to become a mathematician, but to understand the difference between O(1), O(log n), O(n), O(n^2), and O(n log n).
    *   **Task 2: Watch & Learn (Hashing):** Watch NeetCode's video on [Arrays & Hashing](https://www.youtube.com/watch?v=s_2_f2-v-aI). Focus on *why* hash maps provide, on average, O(1) time complexity for insertion and lookup.
    *   **Task 3: Setup Your Workspace:** Create a new folder on your computer for this 16-week journey. Inside, create a `week_01` folder. This is where you will save your code for this week.
    *   **AI Tutor Prompt:** "Explain time and space complexity to me like I'm a smart high school student. Give me one simple code example for each of O(1), O(n), and O(n^2) time complexities."

*   **Tuesday: First Application - Existence Checking**
    *   **Objective:** Use a hash set to solve the classic problem of checking for duplicates.
    *   **Task 1: Solve LeetCode #217. [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)**
        1.  Read the problem and constraints carefully.
        2.  **Brute-Force First:** Think about how you would solve this with nested loops. What is the time complexity? (It's O(n^2)).
        3.  **Optimal Approach:** How can a data structure that provides O(1) lookups help? A hash set is perfect.
        4.  **Implement (Python):** Write the solution using a hash set. Iterate through the array. For each element, check if it's in the set. If it is, return `True`. If not, add it to the set.
        5.  **Analyze:** In your notes, write down the time complexity (O(n)) and space complexity (O(n)) of your optimal solution. Justify why.
    *   **Task 2: Solve LeetCode #242. [Valid Anagram](https://leetcode.com/problems/valid-anagram/)**
        1.  Read the problem. Anagrams have the same character counts.
        2.  **Optimal Approach:** A hash map (or a fixed-size array of 26 for just lowercase letters) is perfect for storing character counts.
        3.  **Implement (Python):** Create a hash map. Iterate through the first string, incrementing counts. Iterate through the second string, decrementing counts. Check if all counts in the map are zero.
        4.  **Analyze:** Write down the time complexity (O(n)) and space complexity (O(k), where k is the number of unique characters).

*   **Wednesday: The Classic Problem - Two Sum**
    *   **Objective:** Solve the most famous interview question and internalize its hashing pattern.
    *   **Task 1: Solve LeetCode #1. [Two Sum](https://leetcode.com/problems/two-sum/)**
        1.  Read the problem carefully. You need to return the *indices*.
        2.  **Brute-Force First:** Again, visualize the O(n^2) nested loop solution.
        3.  **Optimal Approach:** As you iterate through the array, for each element `x`, you need to know if `target - x` exists in the array *and* what its index is. This is a perfect use case for a hash map that stores `value -> index`.
        4.  **Implement (Python):** Create an empty hash map. Iterate through the array with `enumerate` to get both index and value. For each `(i, num)`, calculate `diff = target - num`. Check if `diff` is in your map. If it is, you've found your pair! Return `[i, map[diff]]`. If not, add `num: i` to the map.
        5.  **Analyze:** Write down the O(n) time and O(n) space complexity.
    *   **AI Tutor Prompt:** "I solved Two Sum using a hash map. Can you explain the exact sequence of events for the input `nums = [2, 7, 11, 15]` and `target = 9`? Show me the state of the hash map at each step of the iteration."

*   **Thursday: Grouping with Hashes**
    *   **Objective:** Use a canonical representation (a sorted string) as a key in a hash map to group similar items.
    *   **Task 1: Solve LeetCode #49. [Group Anagrams](https://leetcode.com/problems/group-anagrams/)**
        1.  Read the problem. You need to group words that are anagrams of each other.
        2.  **Key Insight:** What do all anagrams have in common? They are made of the same letters. If you sort the letters of an anagram, you get the same result (e.g., "eat", "tea", "ate" all become "aet"). This sorted version is the "canonical key."
        3.  **Implement (Python):** Create a default dictionary with a list as the factory (`defaultdict(list)`). Iterate through the input list of strings. For each string, create its sorted version (the key). Append the original string to the list associated with that key in your map. Finally, return the values of the map.
        4.  **Analyze:** What is the time complexity? It's roughly O(m * n log n), where m is the number of strings and n is the length of the longest string (because of the sorting). Space is O(m * n).

*   **Friday: Deep Dive - Hashing Internals & C++**
    *   **Objective:** Look under the hood of hash maps and apply your knowledge in a lower-level language.
    *   **Task 1: Read & Research:**
        *   Read the Wikipedia page on [Hash table](https://en.wikipedia.org/wiki/Hash_table).
        *   Focus on understanding the concepts of a **Hash Function** (what makes a good one?) and **Collision Resolution** (what is separate chaining?).
    *   **Task 2: Implement in C++:** Re-implement your *Two Sum* solution in C++.
        1.  Use `<vector>` for the numbers and `<unordered_map>` for the hash map.
        2.  Pay attention to the syntax for declaring the map (`std::unordered_map<int, int>`), inserting (`map[key] = value`), and finding elements (`map.find(key)`).
        3.  Notice how C++'s static typing requires you to be more explicit than Python.
    *   **AI Tutor Prompt:** "Can you explain the difference between `std::map` and `std::unordered_map` in C++? What are the time complexity guarantees for each, and why would I choose one over the other?"

*   **Saturday: Review & Synthesis**
    *   **Objective:** Solidify the week's learning and connect the concepts.
    *   **Task 1: Re-solve:** Solve *Group Anagrams* again from a blank slate, without looking at your old code.
    *   **Task 2: Synthesize:** In your notes, write a paragraph answering the following question: "You are given a problem that seems to require nested loops for a brute-force O(n^2) solution. What is the key characteristic of such a problem that suggests a hash map could optimize it to O(n), and what is the typical space complexity trade-off?"

*   **Sunday: Rest.** Absolutely no coding. Let the concepts sink in. Go for a walk.

---

### **Week 2: Two Pointers**
**Weekly Goal:** To master the Two Pointers pattern, a simple yet powerful technique for optimizing problems on sorted arrays from O(n^2) to O(n) time by intelligently traversing the array from both ends.

*   **Monday: Concept Day**
    *   **Objective:** Understand the core logic behind the two-pointer technique.
    *   **Task 1: Watch & Learn:** Watch NeetCode's video on the [Two Pointers](https://www.youtube.com/watch?v=g_w02zK2i_c) pattern. Pay close attention to the three main variations: pointers from opposite ends, pointers moving in the same direction (fast/slow), and pointers on separate arrays.
    *   **Task 2: Setup:** In your main folder, create a `week_02` subfolder for this week's code.
    *   **AI Tutor Prompt:** "Explain the two-pointer technique to me. What is the most important pre-condition for the 'converging pointers' (one from left, one from right) approach to work? Why?"

*   **Tuesday: Foundational Application**
    *   **Objective:** Apply the converging pointers pattern to simple palindrome and search problems.
    *   **Task 1: Solve LeetCode #125. [Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)**
        1.  Read the problem. Note that you must ignore non-alphanumeric characters and case.
        2.  **Setup:** Initialize a left pointer at the start of the string and a right pointer at the end.
        3.  **Implement (Python):** Use a `while left < right` loop. Inside the loop, you need nested loops to skip non-alphanumeric characters by advancing the left pointer and decrementing the right pointer. Once you have two characters to compare, convert them to lowercase and check if they are the same. If not, return `False`. If they are, advance `left` and decrement `right`. If the main loop finishes, it's a palindrome.
        4.  **Analyze:** Time complexity is O(n) because each pointer traverses the string at most once. Space is O(1).
    *   **Task 2: Solve LeetCode #167. [Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)**
        1.  Read the problem. The key is that the input array is **sorted**.
        2.  **Setup:** Initialize `left = 0`, `right = len(numbers) - 1`.
        3.  **Implement (Python):** In a `while left < right` loop, calculate `current_sum = numbers[left] + numbers[right]`.
            *   If `current_sum > target`, you need a smaller sum. Which pointer should you move? The right one. Decrement `right`.
            *   If `current_sum < target`, you need a larger sum. Move the left pointer. Increment `left`.
            *   If `current_sum == target`, you found the solution.
        4.  **Analyze:** Time complexity is O(n). Space is O(1). Compare this to the O(n) space required for the original *Two Sum*.

*   **Wednesday: The "3Sum" Challenge**
    *   **Objective:** Tackle a very common and more complex interview problem that builds on the two-pointer pattern.
    *   **Task 1: Solve LeetCode #15. [3Sum](https://leetcode.com/problems/3sum/)**
        1.  Read the problem carefully. The main challenges are finding triplets that sum to zero and avoiding duplicate triplets in the output.
        2.  **High-Level Plan:** You can reduce this to the *Two Sum II* problem. First, sort the input array. Then, iterate through the array with a `for` loop. For each element `a` in the array, run the *Two Sum II* algorithm on the rest of the array to find `b` and `c` such that `a + b + c = 0`.
        3.  **Implement (Python):**
            *   Sort the input `nums`.
            *   Loop through `nums` with `enumerate` for index `i` and value `a`.
            *   **Crucial:** To avoid duplicate triplets for `a`, if `i > 0` and `a == nums[i-1]`, `continue`.
            *   Inside this loop, run your two-pointer logic with `left = i + 1` and `right = len(nums) - 1`.
            *   Find triplets that sum to zero. When you find one, append it to your results.
            *   **Crucial:** To avoid duplicates for `b` and `c`, after finding a valid triplet, increment `left` and keep incrementing it as long as `nums[left] == nums[left - 1]`.
        4.  **Analyze:** The complexity is O(n^2) because of the main loop (O(n)) and the nested two-pointer traversal (O(n)). Sorting takes O(n log n), but that's dominated by O(n^2).

*   **Thursday: A Different Kind of Two-Pointer Problem**
    *   **Objective:** Apply the two-pointer pattern to a problem that isn't about finding a sum.
    *   **Task 1: Solve LeetCode #11. [Container With Most Water](https://leetcode.com/problems/container-with-most-water/)**
        1.  Read the problem. You want to maximize the area, which is `(right - left) * min(height[left], height[right])`.
        2.  **Setup:** `left = 0`, `right = len(height) - 1`.
        3.  **Implement (Python):** In a `while left < right` loop, calculate the current area and update your max area.
        4.  **Key Insight:** Now, which pointer do you move? The width `(right - left)` is always decreasing. To have a chance at a larger area, you must increase the height. The current height is limited by `min(height[left], height[right])`. If you move the pointer of the *taller* line, you are guaranteed to not increase the limiting height, so the area cannot increase. Therefore, you must move the pointer of the *shorter* line inward. If `height[left] < height[right]`, increment `left`. Otherwise, decrement `right`.
    *   **AI Tutor Prompt:** "I solved 'Container With Most Water'. Could you provide a formal proof or a more rigorous logical argument for why moving the pointer of the shorter wall is always the correct strategy?"

*   **Friday: Deep Dive - Proofs & C++**
    *   **Objective:** Solidify the theoretical underpinnings and practice with C++.
    *   **Task 1: Read & Research:** Find an article or university lecture notes that formally proves why the converging two-pointer method works on a sorted array for search problems. You are effectively eliminating a portion of the search space with every move. Understand what you are "pruning."
    *   **Task 2: Implement in C++:** Re-implement *Valid Palindrome* in C++.
        1.  Use `<string>`, `<vector>`, and `<cctype>` (for `isalnum` and `tolower`).
        2.  Practice with string manipulation and character functions in C++.

*   **Saturday: Review & Synthesis**
    *   **Objective:** Ensure you can recall and apply the week's patterns under pressure.
    *   **Task 1: Re-solve:** Solve *3Sum* again from a blank slate. This is a problem you should be able to solve cleanly every time.
    *   **Task 2: Synthesize:** In your notes, write a paragraph comparing the use of a hash map (like in *Two Sum*) versus the two-pointer approach (like in *Two Sum II*). What are the trade-offs in terms of time complexity, space complexity, and the pre-conditions required for the input data?

*   **Sunday: Rest.** Go for a hike. Do not code.

---

### **Week 3: Stacks**
**Weekly Goal:** To deeply understand the Last-In-First-Out (LIFO) principle and apply it to solve problems involving sequence validation (like parentheses), simulations (like `MinStack`), and finding the next greater element (using the monotonic stack pattern).

*   **Monday: Concept Day**
    *   **Objective:** Understand the stack as a conceptual data structure and its basic operations.
    *   **Task 1: Watch & Learn:** Watch NeetCode's video on [Stacks](https://www.youtube.com/watch?v=F1F2_1_t03A). Focus on the core operations: `push`, `pop`, and `peek` (or getting the top element).
    *   **Task 2: Setup:** In your main folder, create a `week_03` subfolder.
    *   **Task 3: Implement (Python):** In Python, a list can be used as a stack. The `append()` method is `push`, and the `pop()` method is `pop`. The top element is `my_list[-1]`. Write a small script to demonstrate these three operations.
    *   **AI Tutor Prompt:** "What are some real-world analogies for a stack data structure? And what are some common use cases for stacks in computer science, beyond the problems I'll solve this week?"

*   **Tuesday: The Classic Application - Parentheses**
    *   **Objective:** Solve the quintessential stack problem: validating a sequence of matching pairs.
    *   **Task 1: Solve LeetCode #20. [Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)**
        1.  Read the problem. The key is that brackets must be closed in the correct order. `([)]` is invalid.
        2.  **Key Insight:** When you see an opening bracket, you need to "remember" it. When you see a closing bracket, you must match it with the *most recently seen* opening bracket. This is a perfect LIFO scenario.
        3.  **Implement (Python):**
            *   Create an empty list to use as your stack.
            *   Create a hash map to store the matching pairs, e.g., `mapping = {")": "(", "}": "{", "]": "["}`.
            *   Iterate through the input string.
            *   If a character is a closing bracket (i.e., it's a key in your map), check if the stack is not empty AND if the top element of the stack `stack[-1]` is the corresponding opening bracket `mapping[char]`. If both are true, `pop` from the stack. Otherwise, the string is invalid, return `False`.
            *   If a character is an opening bracket, `push` (append) it onto the stack.
            *   **Final Check:** After the loop, if the string was perfectly balanced, the stack should be empty. Return `not stack`.
        4.  **Analyze:** Time complexity is O(n) because you visit each character once. Space is O(n) in the worst case (e.g., a string of all opening brackets).

*   **Wednesday: Simulating an Augmented Stack**
    *   **Objective:** Design a data structure that behaves like a stack but has an additional feature.
    *   **Task 1: Solve LeetCode #155. [Min Stack](https://leetcode.com/problems/min-stack/)**
        1.  Read the problem. You need to support `push`, `pop`, `top`, and `getMin` in constant O(1) time.
        2.  **Key Insight:** A single stack won't work easily. `getMin` would be O(n). You need to store the minimum value seen *so far* at each stage.
        3.  **Implement (Python):** Use two stacks. One is the main stack. The second is the "min stack".
            *   `push(val)`: Push `val` onto the main stack. For the min stack, push `min(val, self.min_stack[-1])` if the min stack is not empty, otherwise just push `val`.
            *   `pop()`: Pop from both the main stack and the min stack.
            *   `top()`: Return the top of the main stack.
            *   `getMin()`: Return the top of the min stack.
        4.  **Analyze:** All operations are O(1). The space complexity is O(n) because of the second stack.

*   **Thursday: The Monotonic Stack Pattern**
    *   **Objective:** Learn and apply a more advanced stack pattern for "next greater element" type problems.
    *   **Task 1: Solve LeetCode #739. [Daily Temperatures](https://leetcode.com/problems/daily-temperatures/)**
        1.  Read the problem. For each day, you want to find the next day with a warmer temperature.
        2.  **Key Insight:** A brute-force O(n^2) approach is too slow. Consider processing the temperatures in a single pass. As you iterate, you need to remember the indices of previous days that are still waiting for a warmer day. A stack is perfect for this.
        3.  **Implement (Python):**
            *   Create an answer array of all zeros. Create an empty stack.
            *   Iterate through the `temperatures` array with `enumerate` to get index `i` and temp `t`.
            *   Use a `while` loop: while the stack is not empty AND the current temperature `t` is greater than the temperature at the index stored on top of the stack (`temperatures[stack[-1]]`), it means you've found the answer for that previous day.
            *   Inside the `while` loop: `prev_index = stack.pop()`. `ans[prev_index] = i - prev_index`.
            *   After the `while` loop, push the current index `i` onto the stack. These are the days now waiting for a warmer day.
        4.  **Analyze:** This is O(n) time because each index is pushed and popped onto the stack at most once.

*   **Friday: Deep Dive - Pattern Recognition & C++**
    *   **Objective:** Solidify the monotonic stack pattern and implement a class in C++.
    *   **Task 1: Read & Research:** The "monotonic stack" is a stack where the elements are always in a sorted order (either increasing or decreasing). Read an article that shows a few more examples of this pattern to help you recognize it in the future.
    *   **Task 2: Implement in C++:** Re-implement the `MinStack` class in C++.
        1.  Use `<stack>` or `<vector>` to implement the stacks.
        2.  Focus on the class structure (`class MinStack { ... }`), public methods, and private member variables. This is great practice for object-oriented programming in C++.
    *   **AI Tutor Prompt:** "I've learned about the monotonic stack pattern for 'Daily Temperatures'. Can you give me another LeetCode problem (just the name and number) where this same pattern is useful?"

*   **Saturday: Review & Synthesis**
    *   **Objective:** Ensure you can recognize and apply the week's patterns.
    *   **Task 1: Re-solve:** Solve *Daily Temperatures* again from a blank slate.
    *   **Task 2: Synthesize:** In your notes, write a paragraph answering: "What are the key characteristics of a problem that suggest a stack might be a useful data structure? Give one example for a 'validation' type problem and one for a 'next greater element' type problem."

*   **Sunday: Rest.** Let the LIFO logic settle.

---

### **Week 4: Binary Search**
**Weekly Goal:** To master the O(log n) binary search algorithm. This means not only implementing it flawlessly for basic search but also learning to recognize and apply it to more abstract problems where you "binary search on the answer."

*   **Monday: Concept Day**
    *   **Objective:** Understand the core "divide and conquer" strategy of binary search.
    *   **Task 1: Watch & Learn:** Watch NeetCode's video on [Binary Search](https://www.youtube.com/watch?v=s4DPM8ct1pI). Pay extremely close attention to the initialization of the `left` and `right` pointers and the `while` loop condition (`<=` vs `<`). These details are critical.
    *   **Task 2: Setup:** Create a `week_04` subfolder.
    *   **Task 3: Implement (Python):** Write a "perfect" implementation of binary search from memory. Test it with edge cases: an empty array, an array with one element, a target that is smaller than all elements, and a target that is larger.
    *   **AI Tutor Prompt:** "Explain the difference between the two common binary search templates: one where `right = len(arr) - 1` and the loop is `while left <= right`, and another where `right = len(arr)` and the loop is `while left < right`. What are the pros and cons of each?"

*   **Tuesday: Foundational Application**
    *   **Objective:** Apply binary search to standard, straightforward problems.
    *   **Task 1: Solve LeetCode #704. [Binary Search](https://leetcode.com/problems/binary-search/)**
        1.  This is a direct implementation. Your goal is perfection.
        2.  **Implement (Python):** `left, right = 0, len(nums) - 1`. Use a `while left <= right` loop. Calculate `mid = left + (right - left) // 2`. If `nums[mid] > target`, set `right = mid - 1`. If `nums[mid] < target`, set `left = mid + 1`. Else, you've found it. If the loop terminates without finding the target, return -1.
        3.  **Analyze:** Time complexity is O(log n). Space is O(1).
    *   **Task 2: Solve LeetCode #74. [Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)**
        1.  Read the problem. Note the two properties: rows are sorted, and the first integer of a row is greater than the last integer of the previous row. This means the whole matrix is effectively a single sorted array.
        2.  **Implement (Python):** You can solve this by first doing a binary search on the rows to find which row the target *should* be in. Then, do a binary search on that specific row. This is a clean, two-step binary search.
        3.  **Analyze:** Time complexity is O(log m + log n), where m is the number of rows and n is the number of columns.

*   **Wednesday: Binary Search on the Answer**
    *   **Objective:** Tackle a problem where you aren't searching for an element in an array, but searching for the *optimal answer* within a range of possibilities.
    *   **Task 1: Solve LeetCode #875. [Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/)**
        1.  Read the problem. You need to find the *minimum* eating speed `k`.
        2.  **Key Insight:** The answer `k` can range from 1 to `max(piles)`. This range is sorted. We can use binary search to find the optimal `k`.
        3.  **Setup:** The "search space" is the possible speeds. `left = 1`, `right = max(piles)`. `result = right`.
        4.  **Implement (Python):**
            *   Start a `while left <= right` loop. `speed = (left + right) // 2`.
            *   Write a helper function or inner loop to calculate the total hours required to eat all bananas at this `speed`. Remember to use `math.ceil()`.
            *   If `total_hours <= h`, it means this `speed` is a *possible* answer. We should record it (`result = speed`) and try for an even better (slower) speed. So, we search the left half: `right = speed - 1`.
            *   If `total_hours > h`, this `speed` is too slow. We must eat faster. Search the right half: `left = speed + 1`.
        5.  **Analyze:** The complexity is O(n * log(max(piles))), where you check all `n` piles for each of the `log(max(piles))` speeds you test.

*   **Thursday: Binary Search on a Rotated Array**
    *   **Objective:** Apply binary search to a "partially sorted" array, a common and tricky interview variant.
    *   **Task 1: Solve LeetCode #153. [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)**
        1.  Read the problem. A sorted array has been rotated. You need to find the "pivot" or minimum element.
        2.  **Key Insight:** In a rotated sorted array, if you pick a `mid` element, one half of the array (from `left` to `mid` or from `mid` to `right`) will always be properly sorted. You can use this property.
        3.  **Implement (Python):** `left, right = 0, len(nums) - 1`. `res = nums[0]`.
            *   In a `while left <= right` loop:
            *   Check if the current window `nums[left:right+1]` is already sorted (`nums[left] < nums[right]`). If so, the minimum is `nums[left]`. Update `res` and break.
            *   Calculate `mid`. Update `res = min(res, nums[mid])`.
            *   Now, decide where to search. If `nums[mid] >= nums[left]`, it means the left portion is sorted. The pivot must be in the right portion. So, `left = mid + 1`.
            *   Otherwise, the right portion must be sorted, so the pivot is in the left portion. `right = mid - 1`.
    *   **AI Tutor Prompt:** "For 'Find Minimum in Rotated Sorted Array', walk me through the state of the `left`, `right`, and `mid` pointers for the input `nums = [4, 5, 6, 7, 0, 1, 2]`."

*   **Friday: Deep Dive - Proofs & C++**
    *   **Objective:** Understand the theoretical guarantees and practice a perfect C++ implementation.
    *   **Task 1: Read & Research:** Read a formal proof of correctness for binary search. It's based on the idea of a "loop invariant" – a condition that is true at the start of every loop iteration. For binary search, the invariant is "if the target exists in the array, it must be in the range `[left, right]`".
    *   **Task 2: Read & Research (Integer Overflow):** Look up the famous Google bug related to binary search's midpoint calculation. Understand why `mid = (left + right) / 2` can fail for very large arrays in languages like Java or C++, and why `mid = left + (right - left) / 2` is the robust solution.
    *   **Task 2: Implement in C++:** Re-implement the basic LeetCode #704. *Binary Search* in C++.
        1.  Use `<vector>`.
        2.  Be extremely careful with your types and indices.
        3.  Use the safer midpoint calculation.

*   **Saturday: Review & Synthesis**
    *   **Objective:** Solidify the abstract application of binary search.
    *   **Task 1: Re-solve:** Solve *Koko Eating Bananas* again from a blank slate.
    *   **Task 2: Synthesize:** In your notes, write a detailed paragraph outlining the mental model for "Binary Search on the Answer." What are the key steps? (1. Identify the range of possible answers. 2. Define a `check(k)` function that returns true if answer `k` is feasible. 3. Use the binary search template to find the minimum/maximum `k` that satisfies the `check` function).

*   **Sunday: Rest.** Your brain needs to defragment the logs.

---
### **Weeks 5 & 6: Pointer-Based Structures I - Linked Lists & Trees**
**Unit Goal:** To master fundamental pointer-based, non-linear data structures. Week 5 focuses on the linear sequence of Linked Lists. Week 6 applies those pointer concepts to the hierarchical structure of Trees, with a heavy emphasis on recursion.

---
### **Week 5: Linked Lists**
**Weekly Goal:** Understand memory layout, pointer manipulation, and common list algorithms. This week is crucial for building the mental model needed for tree and graph problems.

*   **Monday: Concept Day**
    *   **Objective:** Understand what a linked list is and how it differs from an array.
    *   **Task 1: Watch & Learn:** Watch NeetCode's video on [Linked Lists](https://www.youtube.com/watch?v=Hj_rA0dhr2I).
    *   **Task 2: Implement from Scratch (Python):**
        1.  In your `week_05` folder, create a file. Define a `ListNode` class with two attributes: `val` and `next`. Initialize `next` to `None`.
        2.  This simple class is the building block for all linked list problems.
    *   **AI Tutor Prompt:** "Draw me a simple diagram showing how an array `[1, 2, 3]` is stored in memory versus how a linked list with the same values would be. Highlight the difference in contiguous memory and pointers."

*   **Tuesday: The Core Operation - Reversal**
    *   **Objective:** Master reversing a linked list, a subroutine in many more complex problems.
    *   **Task 1: Solve LeetCode #206. [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)**
        1.  **Iterative Solution:** This is the most common. You need two pointers: `prev` (initially `None`) and `curr` (initially `head`). In a loop, you need a third temporary pointer to hold `curr.next`. Then, you "swing" the `curr.next` pointer to point to `prev`. Finally, you advance both `prev` and `curr`.
        2.  **Recursive Solution:** This is less common but great for understanding recursion. The base case is an empty or single-node list. The recursive step is: `new_head = reverseList(head.next)`. After the recursion returns, `head.next.next = head` and `head.next = None`.
        3.  Draw out both solutions on paper to fully grasp the pointer movements.

*   **Wednesday: Merging and Reordering**
    *   **Objective:** Apply pointer manipulation to combine or restructure lists.
    *   **Task 1: Solve LeetCode #21. [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)**
        1.  **Implement (Python):** Create a dummy `tail` node. In a loop, compare the heads of `list1` and `list2`. Append the smaller node to your `tail`, and advance the pointer of that list. Continue until one list is exhausted. Append the remainder of the other list. Return `dummy.next`.
    *   **Task 2: Solve LeetCode #143. [Reorder List](https://leetcode.com/problems/reorder-list/)**
        1.  This problem is a combination of three sub-problems you know:
            *   Find the middle of the list (use a fast and slow pointer).
            *   Reverse the second half of the list (use your code from Tuesday).
            *   Merge the two halves.

*   **Thursday: Advanced Pointer Techniques**
    *   **Objective:** Use multiple pointers to solve problems in a single pass.
    *   **Task 1: Solve LeetCode #19. [Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)**
        1.  **Key Insight:** Use two pointers, `left` and `right`. First, advance the `right` pointer `n` steps. Now, `left` and `right` are `n` nodes apart. Then, advance both pointers one step at a time until `right` reaches the end. At this point, `left` will be at the node just before the one you want to delete.
    *   **Task 2: Solve LeetCode #141. [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)**
        1.  This is Floyd's Tortoise and Hare algorithm. Use a `slow` pointer (moves 1 step) and a `fast` pointer (moves 2 steps). If they ever meet, there is a cycle.

*   **Friday: Deep Dive - Memory & C++**
    *   **Objective:** Understand the low-level implications of pointer-based structures.
    *   **Task 1: Read & Research:** Research Floyd's Cycle Detection algorithm. Find a proof or explanation for *why* the fast pointer is guaranteed to meet the slow pointer (and not "skip over" it) if a cycle exists.
    *   **Task 2: Implement from Scratch (C++):** In your `week_05` folder, create a C++ file.
        1.  Define a `ListNode` struct.
        2.  Manually create a small linked list (e.g., `1 -> 2 -> 3`) using `new ListNode(...)`.
        3.  Write a function to print the list.
        4.  **Crucially:** Write a function to `delete` the list to prevent memory leaks, iterating through and deleting each node. This is a vital exercise that Python handles for you.
    *   **AI Tutor Prompt:** "Explain stack vs. heap memory in C++. When I create a linked list using `new ListNode()`, where is that memory being allocated? What is my responsibility as a programmer to manage it?"

*   **Saturday: Review & Synthesis**
    *   **Objective:** Solidify the week's patterns.
    *   **Task 1: Re-solve:** Solve *Reorder List* from scratch.
    *   **Task 2: Synthesize:** In your notes, write a detailed comparison of arrays vs. linked lists. Cover: 1) Time complexity for access, search, insertion, and deletion. 2) Memory layout (contiguous vs. scattered). 3) Common use cases for each.

*   **Sunday: Rest.**

---

### **Week 6: Trees**
**Weekly Goal:** Master foundational tree concepts, viewing trees as a generalization of linked lists. The focus is on recursion as the natural way to solve tree problems.

*   **Monday: Concept Day - Traversal**
    *   **Objective:** Understand that a tree is a recursive data structure and learn the fundamental traversal algorithms.
    *   **Task 1: Watch & Learn:** Watch NeetCode's video on [Trees](https://www.youtube.com/watch?v=A_0h5gB03v0).
    *   **Task 2: Implement (Python):**
        1.  In your `week_06` folder, define a `TreeNode` class.
        2.  Write three recursive helper functions: `dfs_in_order`, `dfs_pre_order`, and `dfs_post_order`.
        3.  For each, the base case is `if not node: return`. The recursive calls visit `node.left` and `node.right`. The only difference is when you `print(node.val)`: before, in-between, or after the recursive calls.
        4.  Create a sample tree and test your traversals.

*   **Tuesday: Basic Properties**
    *   **Objective:** Solve problems related to the shape and size of trees.
    *   **Task 1: Solve LeetCode #226. [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)**
        1.  **Recursive approach:** Base case: `if not root: return`. Swap `root.left` and `root.right`. Recursively call on the left and right children.
    *   **Task 2: Solve LeetCode #104. [Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)**
        1.  **Recursive approach:** Base case: `if not root: return 0`. The depth is `1 + max(depth(root.left), depth(root.right))`.

*   **Wednesday: Path and Structure Problems**
    *   **Objective:** Use recursion to pass information up from child nodes to a parent.
    *   **Task 1: Solve LeetCode #543. [Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)**
        1.  **Key Insight:** For any node, the longest path that passes through it is the `depth of its left subtree + depth of its right subtree`. You need to calculate this for every node and find the maximum.
        2.  **Implement (Python):** Write a recursive DFS function that returns the depth of a subtree. Use a non-local variable or a class member to keep track of the maximum diameter found so far. Update this maximum inside your DFS function.
    *   **Task 2: Solve LeetCode #110. [Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)**
        1.  This is very similar. Write a recursive function that returns the height of a subtree. If at any point the sub-problem reveals an unbalanced tree, it should return a special value (like -1) to signal this to all parent callers.

*   **Thursday: Comparison & Substructure Problems**
    *   **Objective:** Use recursion to compare two trees or find a subtree within another.
    *   **Task 1: Solve LeetCode #100. [Same Tree](https://leetcode.com/problems/same-tree/)**
        1.  **Recursive approach:** Compare `p` and `q`. The base cases are key: if both are null, true. If one is null, false. If their values differ, false. The recursive step is `isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`.
    *   **Task 2: Solve LeetCode #572. [Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)**
        1.  This combines two functions. The main function traverses the `root` tree. For each node in `root`, it calls your `isSameTree` function from the previous problem to check if the subtree starting at that node is identical to `subRoot`.

*   **Friday: Deep Dive - BFS & C++**
    *   **Objective:** Learn the non-recursive traversal method (BFS) and practice tree implementation in C++.
    *   **Task 1: Read & Research:** Research Breadth-First Search (BFS) for trees, also known as level-order traversal. Understand how it uses a Queue (First-In-First-Out) data structure to visit the tree level by level.
    *   **Task 2: Solve LeetCode #102. [Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)**
        1.  This is the canonical BFS problem. Use a `collections.deque` in Python.
    *   **Task 3: Implement in C++:** Re-implement the `TreeNode` and the three DFS traversals (in-order, pre-order, post-order) in C++. Use smart pointers (`std::unique_ptr` or `std::shared_ptr`) for the left and right children to practice modern C++ memory management.
    *   **AI Tutor Prompt:** "Explain the trade-offs between DFS and BFS for tree problems. Give me an example of a problem that is much easier to solve with BFS, and one that is much easier to solve with DFS."

*   **Saturday: Review & Synthesis**
    *   **Objective:** Solidify the recursive mindset.
    *   **Task 1: Re-solve:** Solve *Diameter of Binary Tree* from scratch.
    *   **Task 2: Synthesize:** In your notes, write a paragraph describing the general recursive pattern for solving tree problems. It almost always involves: 1. A base case for null nodes. 2. A "post-order" traversal pattern where you recursively call on left and right children. 3. Combining the results from the children's recursive calls to solve the problem for the current node.

*   **Sunday: Rest.**

---
### **Week 7: Heaps & Priority Queues**
**Weekly Goal:** Understand the heap data structure and its common implementation, the priority queue. Master its use for problems involving finding the "top K" or "smallest K" elements, or any problem requiring efficient access to the min/max element of a collection.

*   **Monday: Concept Day**
    *   **Objective:** Understand the heap property and how it allows for O(log n) insertions and O(1) peek operations.
    *   **Task 1: Watch & Learn:** Watch NeetCode's video on [Heaps / Priority Queues](https://www.youtube.com/watch?v=B7hVxCmfPtM).
    *   **Task 2: Setup:** Create a `week_07` folder.
    *   **Task 3: Hands-on with `heapq` (Python):** Python's `heapq` module implements a min-heap.
        1.  Create a list `data = [3, 1, 4, 1, 5, 9, 2, 6]`.
        2.  Use `heapq.heapify(data)` to turn it into a valid heap in-place. Print `data` to see the result.
        3.  Use `heapq.heappop(data)` to remove and return the smallest item.
        4.  Use `heapq.heappush(data, 0)` to add a new item.
        5.  The smallest item is always at `data[0]`.
    *   **AI Tutor Prompt:** "Python's `heapq` is a min-heap. How would I use it to simulate a max-heap? For example, if I need to find the Kth largest element."

*   **Tuesday: Foundational Application**
    *   **Objective:** Apply heaps to simple "Kth element" and simulation problems.
    *   **Task 1: Solve LeetCode #1046. [Last Stone Weight](https://leetcode.com/problems/last-stone-weight/)**
        1.  **Key Insight:** At each step, you need to find the two *largest* stones. A max-heap is perfect for this.
        2.  **Implement (Python):** Since `heapq` is a min-heap, store the stone weights as negative numbers to simulate a max-heap. `heapify` the list. In a loop, pop the two "smallest" (largest negative) numbers, simulate the smash, and push the (negative) result back onto the heap if it's not zero.
    *   **Task 2: Solve LeetCode #703. [Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/)**
        1.  **Key Insight:** You need to maintain the `k` largest elements seen so far. A min-heap of size `k` is perfect.
        2.  **Implement (Python):** In the constructor, create a min-heap of the initial `k` elements. In the `add` method, if the new `val` is larger than the smallest element in your heap (`self.heap[0]`), then pop the smallest and push the new `val`. The Kth largest element is always the root of your min-heap.

*   **Wednesday: The "Top K" Pattern**
    *   **Objective:** Solidify the "Top K Elements" pattern using heaps.
    *   **Task 1: Solve LeetCode #973. [K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/)**
        1.  **Key Insight:** This is a "smallest K" problem. You want the K points with the smallest distance. A max-heap of size `k` is the tool.
        2.  **Implement (Python):** Iterate through the points. For each point, calculate its squared distance. We can use a max-heap (storing negative distances) of size `k`. If the current distance is smaller than the largest distance in the heap, pop the max and push the current point.
    *   **Task 2: Solve LeetCode #215. [Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)**
        1.  This is a more direct version of the stream problem. A min-heap of size `k` is the classic solution.

*   **Thursday: Advanced Heap Application**
    *   **Objective:** Apply heaps to a more complex scheduling or merging problem.
    *   **Task 1: Solve LeetCode #621. [Task Scheduler](https://leetcode.com/problems/task-scheduler/)**
        1.  **Key Insight:** This is a greedy problem. At each step, you want to schedule the task you have the most of. A max-heap is perfect for keeping track of task counts.
        2.  **Implement (Python):** Use a `Counter` to get initial counts. Push them all onto a max-heap (as negative numbers). The main loop simulates time. In each time step, you try to pull up to `n+1` tasks from the heap, decrement their counts, and add them to a temporary queue. After the `n+1` interval, add the tasks from the queue back to the heap if their counts are still positive.
    *   **AI Tutor Prompt:** "For Task Scheduler, why is a greedy approach of always scheduling the most frequent task guaranteed to be optimal?"

*   **Friday: Deep Dive - Heap Internals & C++**
    *   **Objective:** Understand how a heap is physically implemented and use C++'s built-in priority queue.
    *   **Task 1: Read & Research:** A heap is a complete binary tree that is typically stored in an array. Research how parent and child nodes are related by index. For a node at index `i`, its children are at `2*i + 1` and `2*i + 2`. Its parent is at `(i-1) // 2`. Understand how the `heapify` (or sift-down) operation maintains the heap property recursively.
    *   **Task 2: Implement in C++:** Re-implement *K Closest Points to Origin* in C++.
        1.  Use `<queue>` and `<vector>` to get `std::priority_queue`.
        2.  By default, `std::priority_queue` is a max-heap. This is perfect for the "Top K" pattern where you want to keep the K smallest elements. You'll need to define a custom comparator or store pairs of `(distance, point)` to manage it.

*   **Saturday: Review & Synthesis**
    *   **Objective:** Solidify the heap patterns.
    *   **Task 1: Re-solve:** Solve *Kth Largest Element in an Array* from a blank slate.
    *   **Task 2: Synthesize:** In your notes, write a detailed paragraph explaining the "Top K Elements" pattern. Why is a heap of size `k` more efficient (O(n log k)) than sorting the entire array (O(n log n))?

*   **Sunday: Rest.**

---
### **Week 8: Graphs**
**Weekly Goal:** To understand graph representations and master the two fundamental traversal algorithms, Breadth-First Search (BFS) and Depth-First Search (DFS), which are the building blocks for almost all other graph algorithms.

*   **Monday: Concept Day - Representation**
    *   **Objective:** Understand what a graph is and the two main ways to represent it in code.
    *   **Task 1: Watch & Learn:** Watch NeetCode's video on [Graphs](https://www.youtube.com/watch?v=gXg0i4v5T2A).
    *   **Task 2: Setup:** Create a `week_08` folder.
    *   **Task 3: Implement Representations (Python):**
        1.  **Adjacency List:** This is the most common. Represent a graph as a hash map where keys are nodes and values are a list of their neighbors. For a simple graph `1--2, 2--3`, the adj list would be `{1:[2], 2:[1,3], 3:[2]}`.
        2.  **Adjacency Matrix:** This is a 2D array where `matrix[i][j] = 1` if there's an edge between node `i` and `j`. This is good for dense graphs.
    *   **AI Tutor Prompt:** "What are the time and space complexity trade-offs between an adjacency list and an adjacency matrix for representing a graph?"

*   **Tuesday: Breadth-First Search (BFS)**
    *   **Objective:** Learn BFS for finding the shortest path in an unweighted graph.
    *   **Task 1: Read & Implement:** BFS uses a **Queue** (First-In-First-Out) to explore level by level. Implement a generic BFS traversal on a sample adjacency list. You'll need a queue and a `visited` set to avoid infinite loops.
    *   **Task 2: Solve LeetCode #200. [Number of Islands](https://leetcode.com/problems/number-of-islands/)**
        1.  **Key Insight:** You can treat the 2D grid as a graph where adjacent '1's are connected.
        2.  **Implement (Python):** Iterate through every cell of the grid. If you find a '1' that you haven't visited, you've found a new island. Increment your island count. Then, start a BFS from that cell to find all connected '1's and mark them as visited. The BFS will use a queue and explore neighbors (up, down, left, right).

*   **Wednesday: Depth-First Search (DFS)**
    *   **Objective:** Learn DFS for exploring paths to their conclusion and general traversal.
    *   **Task 1: Read & Implement:** DFS uses a **Stack** (or recursion, which uses the call stack) to explore as far as possible down one path before backtracking. Re-implement the traversal on your sample graph using recursive DFS. You'll still need a `visited` set.
    *   **Task 2: Solve LeetCode #133. [Clone Graph](https://leetcode.com/problems/clone-graph/)**
        1.  **Key Insight:** You need to traverse the original graph while building the new one. A hash map is essential to store a mapping from `old_node -> new_node` to avoid re-cloning nodes and to handle cycles.
        2.  **Implement (Python):** A recursive DFS is very elegant here. Your DFS function takes an `old_node`. The base case: if `old_node` is already in your hash map, return the corresponding `new_node`. Otherwise, create a `new_node`, put it in the map, and then recursively call DFS for all of `old_node`'s neighbors, adding the results to the `new_node`'s neighbor list.

*   **Thursday: Pathfinding and Topological Sort**
    *   **Objective:** Apply graph traversal to more specific problems.
    *   **Task 1: Solve LeetCode #207. [Course Schedule](https://leetcode.com/problems/course-schedule/)**
        1.  **Key Insight:** This is a cycle detection problem in a *directed* graph. If there is a cycle, it's impossible to finish the courses.
        2.  **Implement (Python):** Build an adjacency list. Use DFS. You'll need a `visit` set to track nodes visited in the *current* traversal path and a `path` set to track all nodes ever visited. If you encounter a node that's already in the current `visit` set during a traversal, you've found a cycle.

*   **Friday: Deep Dive - Trade-offs & C++**
    *   **Objective:** Solidify your understanding of when to use BFS vs. DFS and practice C++ implementation.
    *   **Task 1: Read & Research:** Create a table comparing BFS and DFS. Include: Data structure used (Queue vs. Stack), common use cases (e.g., shortest path vs. connectivity/pathfinding), and what happens on a very deep vs. a very wide graph.
    *   **Task 2: Implement in C++:** Re-implement the *Number of Islands* problem in C++.
        1.  Represent the grid as a `vector<vector<char>>`.
        2.  Implement the BFS traversal. You'll use `<queue>` for the queue and perhaps a `vector<vector<bool>>` for the visited set.

*   **Saturday: Review & Synthesis**
    *   **Objective:** Ensure you can apply the core traversal patterns.
    *   **Task 1: Re-solve:** Solve *Clone Graph* from a blank slate.
    *   **Task 2: Synthesize:** In your notes, write a paragraph answering: "You need to find the shortest path between two nodes in a large, unweighted graph. Which algorithm, BFS or DFS, is guaranteed to find it, and why? Explain how the data structure it uses leads to this guarantee."

*   **Sunday: Rest.** This was a dense phase. Let it consolidate.

---
## **Phase 2: Advanced Topics & Project Execution (Weeks 9-12)**
**Phase Goal:** To transition from foundational knowledge to advanced application. This phase involves tackling more complex algorithmic patterns (especially Dynamic Programming) while dedicating significant, structured time to building your high-impact, research-oriented showcase project.

---
### **Week 9: Project Selection & 1D Dynamic Programming**
**Weekly Goal:** To make a definitive choice for your showcase project and begin its setup, while simultaneously tackling the fundamental patterns of 1D Dynamic Programming (DP).

*   **Monday: Intro to Dynamic Programming**
    *   **Objective:** Understand the core concepts of DP: optimal substructure and overlapping subproblems.
    *   **Task 1: Watch & Learn:** Watch NeetCode's video on [1D Dynamic Programming](https://www.youtube.com/watch?v=Fm_p9lJ4Z_8).
    *   **Task 2: Solve LeetCode #70. [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)**
        1.  **Top-Down (Memoization):** Write a recursive solution. Notice the overlapping subproblems. Add a cache (a dictionary or array) to store results you've already computed.
        2.  **Bottom-Up (Tabulation):** This is often more efficient. Create a DP array. `dp[i]` will store the number of ways to reach step `i`. The recurrence relation is `dp[i] = dp[i-1] + dp[i-2]`.
    *   **Setup:** Create a `week_09` folder.

*   **Tuesday: Deeper 1D DP**
    *   **Objective:** Apply DP to problems that don't look like simple Fibonacci sequences.
    *   **Task 1: Solve LeetCode #322. [Coin Change](https://leetcode.com/problems/coin-change/)**
        1.  **Bottom-Up:** Create a DP array of size `amount + 1`. `dp[i]` will be the minimum coins to make amount `i`. Initialize it with a large value. For each amount `a` from 1 to `amount`, iterate through your `coins`. For each `c`, if `a >= c`, then `dp[a] = min(dp[a], 1 + dp[a - c])`.
    *   **Task 2: Solve LeetCode #198. [House Robber](https://leetcode.com/problems/house-robber/)**
        1.  **Key Insight:** At each house `i`, you have two choices: rob it (and take `nums[i] + rob_from[i-2]`) or don't rob it (and take `rob_from[i-1]`). The DP relation follows from this.

*   **Wednesday & Thursday: Project Initialization**
    *   **Objective:** To formally begin your showcase project.
    *   **Task 1: Make a Final Decision:** You must now choose between the **"Paper Implementation"** and the **"Comparative Algorithm Study"** projects. This decision dictates your work for the next month.
    *   **Task 2: Create the Repository:** Create a new, public GitHub repository for your project. Give it a clear, descriptive name (e.g., `transformer-from-scratch` or `hash-table-performance-study`).
    *   **Task 3: Write the Initial `README.md`:** This is your project's statement of purpose. It must include:
        *   **Title:** Clear and descriptive.
        *   **Summary:** One paragraph explaining what the project is and what you aim to achieve.
        *   **Motivation:** A short section on *why* you chose this project. What interests you about it?
        *   **Empty Sections:** Create headers for "Methodology," "Results & Analysis," "Usage/Installation," and "References."
    *   **Task 4: Initial Research/Setup:**
        *   **If Paper:** Find a high-quality PDF of the paper and save it. Read the abstract and introduction thoroughly.
        *   **If Study:** Formally write down your research question and hypothesis. E.g., "Hypothesis: Chaining will outperform linear probing in scenarios with high load factors and clustered key distributions due to reduced primary clustering."

*   **Friday: Harder 1D DP**
    *   **Objective:** Apply DP to problems with more complex state transitions.
    *   **Task 1: Solve LeetCode #300. [Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/)**
        1.  The O(n^2) DP solution is a good start. `dp[i]` is the length of the LIS ending at index `i`.
    *   **Task 2: Solve LeetCode #139. [Word Break](https://leetcode.com/problems/word-break/)**
        1.  `dp[i]` is a boolean representing whether `s[0...i-1]` can be segmented. To compute `dp[i]`, you check if there is a `j < i` such that `dp[j]` is true AND `s[j...i-1]` is in the `wordDict`.

*   **Saturday: Project Deep Dive**
    *   **Objective:** A long, focused session to build project momentum.
    *   **Task:** Based on your project choice:
        *   **If Paper:** Read the entire "Methodology" section of the paper. Start implementing the very basic building blocks in Python/PyTorch (e.g., the `MultiHeadAttention` module, even if it's just a skeleton `nn.Module` class).
        *   **If Study:** Implement the C++ class for the *first* algorithm you are studying (e.g., a hash table using separate chaining). Write the basic Pybind11 bindings to make it callable from Python.

*   **Sunday: Rest.**

---

### **Week 10: Graphs Revisited & Project Core Implementation**
**Weekly Goal:** To solidify your understanding of graph algorithms by tackling more complex problems, while building out the main, functional skeleton of your project.

*   **Monday: Graph Connectivity**
    *   **Objective:** Apply graph traversal to more complex connectivity problems.
    *   **Task 1: Solve LeetCode #261. [Graph Valid Tree](https://leetcode.com/problems/graph-valid-tree/) (Premium - find on LintCode or elsewhere)**
        1.  **Key Insight:** For a graph to be a valid tree, two conditions must be met: 1) It must be fully connected. 2) It must contain no cycles. You can check both with a single traversal (DFS or BFS).
    *   **Task 2: Solve LeetCode #323. [Number of Connected Components in an Undirected Graph](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/) (Premium)**
        1.  This is very similar to *Number of Islands*. Iterate from node 0 to n-1. If a node hasn't been visited, increment a counter and start a traversal (BFS/DFS) to find all nodes in its component.
    *   **Setup:** Create `week_10` folder.

*   **Tuesday: Advanced Graph Traversal**
    *   **Objective:** Apply traversal to implicit graphs and handle complex states.
    *   **Task 1: Solve LeetCode #417. [Pacific Atlantic Water Flow](https://leetcode.com/problems/pacific-atlantic-water-flow/)**
        1.  **Key Insight:** Don't think about water flowing down. Think about what cells can reach the oceans. Start a traversal (BFS or DFS) *from* the ocean cells inward.
        2.  **Implement:** Create two `visited` sets, `pacific_reachable` and `atlantic_reachable`. Start traversals from all border cells adjacent to each ocean. The final answer is the intersection of these two sets.

*   **Wednesday & Thursday: Project Core Implementation**
    *   **Objective:** To have a runnable, albeit incomplete, version of your project.
    *   **Task:**
        *   **If Paper:** Implement all the main modules of the network. The code should be structured, with clear classes for each logical component (e.g., `EncoderLayer`, `DecoderLayer`). Create a main model class that wires them all together. You should be able to instantiate your model and print its structure.
        *   **If Study:** Implement the C++ classes for *all* the algorithms you are comparing. Make sure they all adhere to the same interface (e.g., `insert`, `find`, `erase`). Ensure your Pybind11 bindings expose all of them to Python.

*   **Friday: Topological Sort**
    *   **Objective:** Master cycle detection and ordering in directed acyclic graphs (DAGs).
    *   **Task 1: Solve LeetCode #207. [Course Schedule](https://leetcode.com/problems/course-schedule/)**
        1.  This is a canonical cycle detection problem in a directed graph. A DFS-based approach is common.
    *   **Task 2: Solve LeetCode #210. [Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)**
        1.  This builds on the previous problem. In addition to detecting a cycle, you need to return the topological sort. You can get this by adding a node to the *end* of your result list after its DFS completes.

*   **Saturday: Project Integration**
    *   **Objective:** A long session focused on making the parts of your project work together.
    *   **Task:**
        *   **If Paper:** Write a script that creates a random tensor with the correct input shape and passes it through your model (`model(input_tensor)`). This will catch many shape-related bugs and ensure your `forward` pass is wired correctly.
        *   **If Study:** Write the Python script that will run your benchmarks. It should have a function that takes one of your C++ objects and a dataset, and then runs the timing experiment. Test it with one of your implementations and a tiny dataset to make sure the end-to-end flow works.

*   **Sunday: Rest.**

---

### **Week 11: Backtracking, Tries & Project Experimentation**
**Weekly Goal:** To learn backtracking as a brute-force recursive technique and Tries as a specialized tree for string problems, while getting the first real data out of your project.

*   **Monday: Backtracking**
    *   **Objective:** Understand backtracking as a structured way to explore all possible solutions to a problem.
    *   **Task 1: Watch & Learn:** NeetCode's video on [Backtracking](https://www.youtube.com/watch?v=gBC___i_W1g).
    *   **Task 2: Solve LeetCode #78. [Subsets](https://leetcode.com/problems/subsets/)**
        1.  **Implement:** Write a recursive backtracking function `backtrack(start_index, current_subset)`. In the function, first add `current_subset` to your results. Then, loop from `start_index` to the end of the array. In the loop, add the current element, make a recursive call `backtrack(i + 1, ...)`, and then "backtrack" by removing the element.
    *   **Setup:** Create `week_11` folder.

*   **Tuesday: More Backtracking**
    *   **Objective:** Apply backtracking to problems with more complex constraints.
    *   **Task 1: Solve LeetCode #46. [Permutations](https://leetcode.com/problems/permutations/)**
    *   **Task 2: Solve LeetCode #39. [Combination Sum](https://leetcode.com/problems/combination-sum/)**

*   **Wednesday & Thursday: Project Experimentation**
    *   **Objective:** To run your project end-to-end and generate your first results.
    *   **Task:**
        *   **If Paper:** Set up the full data loading pipeline using PyTorch's `Dataset` and `DataLoader`. Choose a simple optimizer (like Adam). Write the training loop. Run your model for a few epochs on a standard, small dataset (e.g., train a Transformer on a tiny translation task). The goal is to see the loss go down. It doesn't have to be perfect.
        *   **If Study:** Design your experimental data. You'll need different datasets (e.g., random integers, sequential integers, integers with a skewed distribution). Run your benchmark script on all your C++ implementations with this data. Save the results (e.g., timings) to a CSV file.

*   **Friday: Tries**
    *   **Objective:** Understand the Trie data structure for efficient prefix-based string searching.
    *   **Task 1: Watch & Learn:** NeetCode's video on [Tries](https://www.youtube.com/watch?v=A_0h5gB03v0) (part of Trees video).
    *   **Task 2: Solve LeetCode #208. [Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)**
        1.  **Implement:** The core of a Trie is a `TrieNode` class. Each node needs a children map (e.g., a hash map) and a boolean `isEndOfWord`. The `insert`, `search`, and `startsWith` methods are all simple traversals down the tree from the root.

*   **Saturday: Project Analysis & Visualization**
    *   **Objective:** A long session to analyze and present your initial findings.
    *   **Task:**
        *   **If Paper:** Plot the training loss curve from your experiment. Does it look reasonable? Write the "Methodology" section of your `README`, explaining the architecture you implemented and the training setup.
        *   **If Study:** Load your results CSV into a Python script using pandas. Use `matplotlib` or `seaborn` to create the first plots for your `README` (e.g., a bar chart comparing insertion times). Write the "Methodology" and "Results" sections of your `README`.

*   **Sunday: Rest.**

---

### **Week 12: 2D DP & Project Refinement**
**Weekly Goal:** To extend your DP skills to 2D problems and to refine, debug, and document your project based on your initial results.

*   **Monday: 2D Dynamic Programming**
    *   **Objective:** Understand how to use a 2D grid to solve DP problems with two changing parameters.
    *   **Task 1: Watch & Learn:** NeetCode's video on [2D Dynamic Programming](https://www.youtube.com/watch?v=Hdr64lAQo_o).
    *   **Task 2: Solve LeetCode #62. [Unique Paths](https://leetcode.com/problems/unique-paths/)**
        1.  **Implement:** Create an `m x n` grid. The number of ways to reach cell `(r, c)` is the `sum of ways to reach (r-1, c)` and `ways to reach (r, c-1)`.
    *   **Setup:** Create `week_12` folder.

*   **Tuesday: Deeper 2D DP**
    *   **Objective:** Apply 2D DP to sequence alignment problems.
    *   **Task 1: Solve LeetCode #1143. [Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)**
        1.  **Implement:** Create a `(len(text1)+1) x (len(text2)+1)` DP grid. The recurrence relation is key: if `text1[i] == text2[j]`, then `dp[i][j] = 1 + dp[i-1][j-1]`. Otherwise, `dp[i][j] = max(dp[i-1][j], dp[i][j-1])`.

*   **Wednesday & Thursday: Project Refinement**
    *   **Objective:** To clean up your project code and improve your results.
    *   **Task:**
        *   **If Paper:** Refactor your code. Is it clean and readable? Add comments. Try to improve your result by tuning a hyperparameter (like learning rate) and re-running the training.
        *   **If Study:** Refactor your C++ code. Is it well-structured? Add comments. Re-run your benchmarks to ensure the results are stable. Refine your plots to make them clear and easy to understand.

*   **Friday: Advanced Algos Review**
    *   **Objective:** Consolidate knowledge of the hardest topics so far.
    *   **Task 1: Re-solve LeetCode #417. [Pacific Atlantic Water Flow]** from a blank slate.
    *   **Task 2: Re-solve LeetCode #139. [Word Break]** from a blank slate.

*   **Saturday: Project Finalization & Documentation**
    *   **Objective:** A long session to finalize the project's code and complete the documentation.
    *   **Task:** Your goal is to have the project in a "finished" state by the end of the day. The code should be clean, the experiments should be complete, and the `README.md` should be fully written with all sections filled out, including your "Results & Analysis" and a clear "Usage/Installation" guide.

*   **Sunday: Rest.** Phase 2 is complete. This is a major milestone.

---
## **Phase 3: Synthesis & Interview Readiness (Weeks 13-16)**
**Phase Goal:** To transition from a student/researcher to a polished engineering candidate. This phase is dedicated to integrating your knowledge, mastering communication of your complex project, and preparing for the specific pressures and formats of top-tier technical interviews.

---
### **Week 13: Project Polish & Mixed Pattern Review**
**Weekly Goal:** To put the final polish on your showcase project, making it a masterpiece, and to begin practicing LeetCode in a mixed-review format to simulate real interview conditions where the pattern is not given.

*   **Monday & Tuesday: Project Perfection**
    *   **Objective:** To elevate your project from "done" to "impressive."
    *   **Task 1: Code Refactoring:** Read through your entire project codebase. Is it clean? Is it well-commented? Is the style consistent? Use a linter. Add docstrings to your Python functions or detailed comments to your C++ classes. Pretend another engineer is about to inherit this code.
    *   **Task 2: `README.md` Enhancement:** Your `README` is the front page of your project.
        *   Add a diagram of your architecture or experimental setup. Use a tool like Mermaid.js or draw.io.
        *   Refine your "Results & Analysis" section. What are the key takeaways? What did you learn?
        *   Ensure the "Usage/Installation" section is flawless. Ask a friend to try and run your project following only the `README`.
    *   **Setup:** Create `week_13` folder.

*   **Wednesday & Thursday: Mixed "Medium" Review**
    *   **Objective:** To practice pattern recognition without the safety net of a topic category.
    *   **Task:** Go to the NeetCode 150 list. Hide the categories. Select **four** random "Medium" problems that you have solved before from different topics (e.g., one from Two Pointers, one from Trees, one from DP, one from Heaps).
    *   **Process:** For each problem, solve it from a blank slate. The most important part is the first five minutes: **explicitly state which pattern you believe applies and why** before you start coding.
    *   **AI Tutor Prompt:** "I'm about to solve LeetCode #XYZ. I believe the correct pattern is [e.g., a Heap] because [e.g., the problem asks for the 'Kth largest' element]. Is my pattern recognition correct for this problem?"

*   **Friday: Mixed "Hard" Review**
    *   **Objective:** To test your limits and see how you approach a much harder problem.
    *   **Task:** Select **one** "Hard" problem from the NeetCode list, preferably one you haven't seen before (e.g., LeetCode #42. [Trapping Rain Water]).
    *   **Process:** Do not worry about solving it optimally or even at all. Spend one hour on it. Your goal is to document your thought process:
        1.  Write down the brute-force solution.
        2.  Identify the bottleneck.
        3.  Brainstorm different approaches (DP, two pointers, stack?).
        4.  Attempt an implementation.
        5.  After the hour, watch NeetCode's solution and understand the optimal approach.

*   **Saturday: Project Presentation Practice**
    *   **Objective:** To begin crafting the story of your project.
    *   **Task:** Write a script for a 5-minute presentation of your project. It should cover:
        1.  **Motivation:** What is the problem or paper, and why is it interesting? (1 min)
        2.  **Methodology:** What did you build? What was the core technical challenge? (2 min)
        3.  **Results & Learning:** What were the results, and what was your key takeaway? (2 min)
    *   **Task:** Practice giving this presentation out loud.

*   **Sunday: Rest.**

---

### **Week 14: ML System Design**
**Weekly Goal:** To learn the language and frameworks for designing large-scale, production-ready machine learning systems.

*   **Monday: The MLOps Lifecycle**
    *   **Objective:** Understand the end-to-end process of production ML.
    *   **Task 1: Read & Research:** Read Chip Huyen's "ML System Design," Chapter 1: Overview, or find a comprehensive blog post on the MLOps lifecycle.
    *   **Task 2: Diagram:** Draw a diagram of the full lifecycle: Data Ingestion -> Feature Engineering -> Model Training -> Model Deployment -> Monitoring.
    *   **Setup:** Create `week_14` folder.

*   **Tuesday: Data & Features**
    *   **Objective:** Understand the components that feed the model.
    *   **Task 1: Read & Research:** Read about **Feature Stores**. What problem do they solve?
    *   **Task 2: Practice:** Let's start designing a "YouTube Recommender." With your AI assistant, brainstorm the features you would need. Consider user features (watch history, subscriptions), video features (category, length), and contextual features (time of day).
    *   **AI Tutor Prompt:** "For a YouTube recommendation system, what are the trade-offs between generating feature embeddings in real-time versus pre-computing them in a batch process and storing them in a feature store?"

*   **Wednesday: Deployment & Serving**
    *   **Objective:** Understand how a trained model gets used.
    *   **Task 1: Read & Research:** Research the difference between **Online (Real-time) Inference** and **Batch Inference**. When would you use each?
    *   **Task 2: Practice:** For your YouTube recommender, would the main recommendation algorithm be online or batch? What about updating the user's feature vector after they watch a new video?

*   **Thursday: Monitoring & The Feedback Loop**
    *   **Objective:** Understand how to maintain a model after deployment.
    *   **Task 1: Read & Research:** Research **Concept Drift** and **Data Drift**. What are they, and how would you monitor for them?
    *   **Task 2: Practice:** For your YouTube recommender, what metric would you monitor to see if the model's performance is degrading? How could you use user feedback (e.g., skipping a recommended video) to create a feedback loop for retraining?

*   **Friday: Full Mock System Design Interview**
    *   **Objective:** To put it all together under pressure.
    *   **Task:** Schedule a 1-hour session.
    *   **AI Tutor Prompt:** "Let's do a full ML System Design mock interview. You are the interviewer. Ask me to 'Design a system to detect plagiarism in student essays.' I will walk you through my process, from clarifying requirements to discussing monitoring. Please give me feedback at the end."

*   **Saturday: Review & Synthesis**
    *   **Objective:** Consolidate your system design knowledge.
    *   **Task:** Write a one-page summary of your plagiarism detector design. Include a simple architecture diagram.

*   **Sunday: Rest.**

---

### **Week 15: Behavioral & Communication Mastery**
**Weekly Goal:** To master the art of telling your unique story and clearly narrating your complex technical thoughts.

*   **Monday: Crafting Your Stories**
    *   **Objective:** To prepare concrete, compelling answers for common behavioral questions.
    *   **Task:** Open a document and write out three detailed project stories using the **STAR method** (Situation, Task, Action, Result).
        1.  **Story 1: A Deep Technical Challenge.** (e.g., "The math in the paper was ambiguous, so I had to derive the matrix shapes myself...")
        2.  **Story 2: A Design Trade-off.** (e.g., "I chose to use C++ for performance in my study, but the trade-off was slower development time...")
        3.  **Story 3: What You Learned.** (e.g., "The key takeaway from my project was that theoretical performance and empirical results can differ...")
    *   **Setup:** Create `week_15` folder.

*   **Tuesday: Storytelling Practice**
    *   **Objective:** To make your stories sound natural and impactful.
    *   **Task:** Practice telling your three STAR stories out loud. Record yourself.
    *   **AI Tutor Prompt:** "Here is my STAR story about a technical challenge. [Paste story]. Can you critique it for clarity, impact, and how well it demonstrates ownership and technical skill?"

*   **Wednesday: Narrated Problem Solving I**
    *   **Objective:** To practice thinking out loud, a critical interview skill.
    *   **Task:** Pick a Medium LeetCode problem you have solved before (e.g., *Reorder List*). Set a timer for 25 minutes.
    *   **Process:** Solve the problem on a whiteboard or in a text editor, but you must **verbalize every single thought**. "Okay, the input is a a linked list. I need to reorder it. This looks like it requires multiple steps. First, I need to find the middle..."
    *   **Task:** Record this session.

*   **Thursday: Self-Critique & Improvement**
    *   **Objective:** To become your own best coach.
    *   **Task:** Watch the recording from yesterday. Take notes. Where did you stumble? Was your explanation clear? Did you explain the 'why' behind your decisions?
    *   **Task:** Based on your notes, re-record the session for the same problem. Aim for a clearer, more confident narration.

*   **Friday: Narrated Problem Solving II (Live Fire)**
    *   **Objective:** To practice thinking out loud on a problem you haven't seen in a while.
    *   **Task:** Pick a Medium LeetCode problem from a topic you covered early on (e.g., *3Sum*).
    *   **Process:** Do another 25-minute narrated solving session. This will feel harder, which is the point.

*   **Saturday: Project Presentation Mastery**
    *   **Objective:** To be able to present your project confidently and concisely.
    *   **Task:** Give your 5-minute project presentation (from Week 13) to a friend, family member, or just record yourself.
    *   **Task:** Prepare answers for follow-up questions: "What would you do differently next time?", "How would you scale this?", "What was the most interesting bug you encountered?"

*   **Sunday: Rest.**

---

### **Week 16: Full Mock Interview Gauntlet**
**Weekly Goal:** To simulate the real interview experience as closely as possible to build confidence, manage stress, and identify final areas for polish.

*   **Monday: Full Mock Interview #1**
    *   **Objective:** To get a baseline under pressure.
    *   **Task:** Schedule a 1-hour block. Use your AI assistant as the interviewer.
    *   **Format:** 5 min intro/behavioral. 40 min technical problem (a new Medium LeetCode problem). 15 min project deep dive and your questions.
    *   **AI Tutor Prompt:** "Let's do a full 1-hour software engineering mock interview. Start with a behavioral question, then give me a Medium LeetCode problem from the NeetCode 150 list that I haven't solved yet. Finally, ask me questions about my project."

*   **Tuesday: Review and Refine**
    *   **Objective:** To learn from your mistakes.
    *   **Task:** Honestly assess your performance. Where did you feel weakest?
        *   **Narration:** Was your thinking clear?
        *   **Coding:** Did you make silly bugs?
        *   **Project:** Were your answers about your project crisp?
    *   **Task:** Spend the day working specifically on your weakest area.

*   **Wednesday: Full Mock Interview #2**
    *   **Objective:** To show improvement.
    *   **Task:** Repeat Monday's process. Aim to be 10% better, especially in the area you identified as a weakness.

*   **Thursday: Review and Refine**
    *   **Objective:** Final polish.
    *   **Task:** Repeat Tuesday's review process. By now, your weaknesses should be minor points of polish, not major gaps. Refine your STAR stories one last time.

*   **Friday: Full Mock Interview #3**
    *   **Objective:** The dress rehearsal.
    *   **Task:** Repeat the mock interview. Go into it with confidence. Your goal is to execute cleanly and communicate effectively.

*   **Saturday: Final Light Review**
    *   **Objective:** To load your mental cache without burning out.
    *   **Task:** Do not do any hard problems.
        *   Quickly read through the titles and one-sentence descriptions of the 10 most important LeetCode problems you solved.
        *   Read your project's `README.md` one last time.
        *   Read your three STAR stories.
        *   Close the computer.

*   **Sunday: Rest.** You have completed the research project. You are ready.
