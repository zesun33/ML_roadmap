# 🚀 16-Week Big-Tech Interview Roadmap

*Audience  *: ML engineer without formal CS degree, strong in Python/C++, aiming for Google, Meta, Amazon, Microsoft, Apple.
*Goal     *: Clear DS&A + ML-system-design interviews within **4 months** (≈16 weeks).
*Commit   *: 2 × 90 min blocks on weekdays + 3 hr total on weekends ≈ **12 hr/week**.

---
## 📅 High-Level Timeline
| Phase | Weeks | Focus |
|-------|-------|-------|
| 0 | 1 | Boot & Tooling |
| 1 | 2-4 | Python Core + DIY Data-Structures |
| 2 | 5-8 | LeetCode Pattern Pass ① |
| 3 | 9-12 | LeetCode Pattern Pass ② ＋ ML Math & Classical ML |
| 4 | 13-15 | System-Design Mini Bootcamp ＋ MLOps |
| 5 | 16 | Mock Loops ＋ Launch |

External anchors  
1. **CodeInMotion 14-Pattern Guide** – <https://www.blog.codeinmotion.io/p/leetcode-patterns>  
2. **AlgoMonster Modules** – <https://algo.monster/dashboard>  
3. **GFG Python-DSA** – <https://www.geeksforgeeks.org/python-data-structures-and-algorithms/>

---
## 🗺️ Week-by-Week Checklist

### **Phase 0 – Week 1 • Bootstrap**
- [ ] Install VS Code + Python extension, `pyenv`/conda, Git, `black`, `pytest`, `pre-commit`.
- [ ] Create **Learning Ledger** (Notion/Obsidian) with pages: `Goals`, `Oops List`, `Daily Log`.
- [ ] Set up LeetCode, AlgoMonster, GitHub profiles; push first "Hello DS&A" repo.
- [ ] Read "Runtime to Algo Cheat Sheet" on AlgoMonster.

### **Phase 1 – Core Python & DIY DS**
#### Week 2
- [ ] Python refresh: variables, loops, functions, `*args/**kwargs`, list/dict comps.  
  Resource: Pythonic-AF roadmap section 1 [[link](https://medium.com/pythonic-af/the-ultimate-roadmap-to-master-python-in-2025-2fa2f1a6d4a4)].
- [ ] Solve 10 easy Array/String problems on LeetCode (timed 15 min each).

#### Week 3
- [ ] OOP: classes, dunder methods, `@dataclass`; write UML for a `FlashCard` app.  
- [ ] Build **FlashCard CLI v0.1** (CRUD JSON) + tests (≥ 80 % cov).

#### Week 4
- [ ] Iterators/generators, decorators, context managers; run `mypy --strict` on codebase.
- [ ] Implement **Stack, Queue, Linked List** in pure Python + benchmark with `timeit`.

### **Phase 2 – LeetCode Patterns ①**
*Weekly rhythm for Weeks 5-8*  
```
Mon   Study pattern note + template.
Tue   2 guided LC problems (easy → medium).
Wed   2 unguided LC mediums.
Thu   Re-code yesterday's problems in C++.
Fri   Review + add "Key Insight" card to Anki.
Sat   90 min catch-up + 30 min AlgoMonster quiz.
Sun   LeetCode Weekly Contest (90 min) + retro.
```

| Week | Patterns (CodeInMotion §) |
|------|---------------------------|
| 5 | Arrays & Hashing |
| 6 | Two Pointers / Sliding Window |
| 7 | Stack / Queue / Monotonic Stack |
| 8 | Prefix Sum / Intervals |

*Milestone EOW-8*: **110 problems solved**, contest percentile ≤ 40 %.

### **Phase 3 – LeetCode Patterns ② ＋ ML Core**
Follow the *same weekly rhythm*; dedicate Saturday to ML topic (2 hr notebook):

| Week | Patterns | ML Topic (Resource §) |
|------|----------|-----------------------|
| 9 | Binary Search ＋ Trees | Linear vs Logistic Regression (Andrew Ng videos) |
|10 | Heaps ＋ Priority Queue | Decision Trees & Random Forest |
|11 | Tries ＋ Backtracking | Gradient Boosting (XGBoost) |
|12 | Graphs (BFS/DFS, Union-Find) | K-means, PCA, t-SNE |

*Milestone EOW-12*: **220 LC solves** (50 % medium, 10 % hard) + 2 ML mini projects (Titanic & Sentiment).

### **Phase 4 – System Design & MLOps**

#### Week 13 – System Design Primer
- [ ] Read Grokking chapters 1-3; watch ByteByteGo video "Design a URL Shortener".
- [ ] Whiteboard design **Real-time Inference API** (lat ≤ 20 ms) in notebook.

#### Week 14 – Data Pipelines & Feature Store
- [ ] Sketch batch + online feature store architecture.
- [ ] Implement simple ETL with **Prefect** that writes to SQLite.

#### Week 15 – Docker ＋ MLflow ＋ Monitoring
- [ ] Dockerize CIFAR-10 ResNet service (FastAPI).
- [ ] Track experiment & register model in **MLflow**.
- [ ] Simulate drift with **EvidentlyAI**; screenshot dashboard.

### **Phase 5 – Week 16 • Mock Loops & Launch**
- [ ] 2 DS&A mocks (Pramp) + 1 System-Design mock (peer).  
  Record feedback ➜ "Oops List."
- [ ] Final résumé update: stats, projects, OSS PRs.
- [ ] Publish LinkedIn article "My 4-month sprint to interview-ready."
- [ ] Ask 5 contacts for referrals; schedule real interviews.

---
## 🕒 Daily Micro-Routine (Post-Week 2)
| Minutes | Action |
|---------|--------|
| 10 | Review Anki (patterns, Big-O, ML metrics). |
| 50 | Primary coding task (see weekly plan). |
| 10 | Quick reflection → Learning Ledger 📝 |

Add a second 60 min block in evening for review / reading as needed.

---
## 🎯 Deliverables at a Glance
- **300 LeetCode** solves (finish NeetCode 150 subset).  
- 1 **FlashCard CLI** project (Python).  
- 2 **ML notebooks** (Titanic, Sentiment).  
- 1 **Dockerized DL service** + MLflow registry.  
- 3 **Design docs** (Inference API, Feature Store, RAG).  
- ≥ 5 mock interviews with "Strong Hire" feedback.

---
## 📚 Resource Appendix
| Area | Free Primary Resource |
|------|-----------------------|
| DS&A Patterns | CodeInMotion 14-Patterns article |
| Guided Practice | AlgoMonster 6-week path |
| Python Core | "Ultimate Python Roadmap 2025" Medium article |
| ML Basics | Andrew Ng ML-Coursera (audit) |
| System Design | ByteByteGo YouTube playlist |
| MLOps | MLOps Zoomcamp materials |

---
## ✅ Habit / Progress Tracker Template (duplicate per week)
```markdown
### Week X Recap
- LeetCode solved   : __ /12
- Pattern this week : ________________
- ML notebook       : ✅ / ❌
- Mock interview    : ✅ / ❌
- Contest percentile: __ %
- Biggest "Oops"    : ____________________________________
- One-line win      : ____________________________________
```

*Print this document or embed in Notion, tick boxes daily, and iterate!* 

---
# 📖 Deep-Dive Playbook  
> This appendix expands the high-level roadmap into **daily, hour-by-hour instructions**.  Use it if you prefer maximum granularity.  
> Each weekday contains two 90-minute blocks (⏲️ Block-A and Block-B).  Weekend agendas assume a single 3-hour focus session.  **Links** are provided inline.

## legend
* **⏲️ Block-A** = Morning / first available 90-min slot  
* **⏲️ Block-B** = Evening / second available 90-min slot  
* **🔗** = External resource (article / video / repo)  
* **📓** = Action to record in Learning Ledger  
* **🏁** = Deliverable / checkpoint

---
## PHASE 0 · Week 1 · "Bootstrap & Habits"
### Goal
1. Have a fully-functional dev environment (VS Code + Python + C++ tool-chain).  
2. Create the Learning Ledger & first entries.  
3. Push an initial GitHub repo & solve the *very first* LeetCode easy.

### Day-by-Day
| Day | ⏲️ Block-A (90 min) | ⏲️ Block-B (90 min) |
|-----|--------------------|--------------------|
| **Mon** | Install VS Code 🔗 <https://code.visualstudio.com/> & extensions (`ms-python.python`, `ms-vscode.cpptools`).  Verify Python 3.11+ via `python --version`. | Install `pyenv` 🔗 <https://github.com/pyenv/pyenv> and create local env: `pyenv install 3.11.5 && pyenv virtualenv 3.11.5 interview-16w`.  📓 ledger entry: *Tool versions.* |
| **Tue** | Configure Git: `git config --global user.name "<your-name>"` etc. Generate SSH key 🔗 GitHub docs. Push **hello-setup** repo (README + `.gitignore`). | Install **pre-commit**: `pip install pre-commit && pre-commit install`. Add hooks: `black`, `isort`, `flake8`. Commit & push. 📓 *Why code quality matters.* |
| **Wed** | Install C++ tool-chain: on Linux `sudo apt install build-essential gdb`. Write `hello.cpp`, compile `g++ -std=c++17`. | Read AlgoMonster "Runtime to Algo Cheat Sheet" 🔗 <https://algo.monster/runtimes>. Write flashcard for Big-O of array ops. 🏁 deliverable: 5 Anki cards. |
| **Thu** | Create **Learning Ledger** in Notion. Sections: Goals, Daily Log, Oops List, Glossary. Copy template from repo 🔗. | Solve LeetCode #1 *Two Sum* (array/hash). Record attempt time, complexity, after-action notes 📓. |
| **Fri** | Watch "Mindset for Algorithm Interviews" 🔗 AlgoMonster getting-started video. Summarize 3 takeaways. | Install Anki 🔗 <https://apps.ankiweb.net/>. Import first deck (`BigO.apkg`). |
| **Sat (3h)** | 1h: VS Code shortcuts tutorial 🔗 <https://youtu.be/ifTF3ags0XI>  
1h: Git branching & merging (Atlassian guide).  
1h: Write blog-style "Week 1 retrospective" in Markdown; push to GitHub Pages (optional). |
| **Sun (3h)** | 90 min: Solve 3 more LC easies (#9, #13, #14).  
45 min: Review solutions + discuss on LC forums.  
45 min: Weekly reflection & planning for Week 2. 🏁 Week-1 done. |

---
## PHASE 1 · Week 2 · "Python Fundamentals I"
### Theme
* Syntax warm-up, functions, core data types.
* First batch of LeetCode string/array easies under 15 min each.

### Daily plan
Day | ⏲️ Block-A | ⏲️ Block-B
--- | --- | ---
Mon | Work through 🔗 *Python Tour — Data Types* (RealPython) sections 1-3. Implement mini-snippets in `scratch.ipynb`. | Read "Beauty of `f-strings`" 🔗. Rewrite snippets to use f-strings & type hints.
Tue | Functions: default args, `*args/**kwargs`. Follow Corey Schafer video 🔗. | Exercise: implement `median(nums: list[float]) -> float` with robust edge handling. Add unit tests via `pytest`.
Wed | List & dict comprehensions. Solve **LC 283 Move Zeroes** w/ list comp. | Profiling intro: run `python -m cProfile scratch.py`. 📓 *One surprising runtime fact.*
Thu | String slicing, immutability. Solve **LC 344 Reverse String** in ≤ 8 min. | Read GfG article on `collections.Counter` 🔗. Extend solution to frequency map variant.
Fri | Error handling basics (`try/except/else/finally`). Refactor previous code with custom `ValueError`. | Publish gist "Week-2 Python patterns"; share on LinkedIn (#100DaysOfCode Day-8).
Sat (3h) | 1h timed set: 5 easy GfG problems (strings). 1h: write summary blog. 1h: prepare Week-3 OOP reading list.
Sun (3h) | LeetCode Weekly Contest warm-up: attempt 2 practice contest problems. Retro & plan.

🏁 **End-Week-2 metrics**  
*LeetCode solved*: 14  | *Median solve time*: ≤ 13 min | *Ledger entries*: ≥ 10

---
## PHASE 1 · Week 3 · "Python OOP + FlashCard CLI"
### Key deliverables
1. `flashcard/` package with CRUD operations, CLI entry-point.
2. ≥ 20 unit tests, coverage ≥ 80 %.
3. UML diagram committed as `design/flashcard.svg`.

Day | ⏲️ Block-A | ⏲️ Block-B
--- | --- | ---
Mon | Watch *OOP in Python* by ArjanCodes 🔗. Draft class skeleton: `Card`, `Deck`, `FlashCardApp`. | Write docstrings & `__repr__` for each class. Run `pydoc-style` linter.
Tue | Implement JSON persistence using `pathlib.Path` & `json.dump`. | Create CLI with `argparse` sub-commands: `add`, `list`, `review`.
Wed | Testing: install `pytest-cov`. Write tests for add/list logic. | Refactor code after TDD cycle. 📓 note on test-driven insights.
Thu | Draw UML with diagrams.net 🔗. Commit image to repo. | Profiling: measure CLI startup time; cache config using `functools.lru_cache`.
Fri | Polish README (badges: build-status, codecov). Publish v0.1 tag on GitHub. | Record 2-min Loom demo; post on LinkedIn.
Sat (3h) | GfG article on decorators 🔗; add `@timed` decorator to CLI commands.  | Write blog "Building a CLI tool in Python — lessons learned".
Sun (3h) | Contest; plus solve 2 medium array questions (#560, #1-two-sum revisit for optimization). 🏁 Week-3 done.

---
## PHASE 1 · Week 4 · "Iterators, Generators, DS from Scratch"
### Focus
* Deep internalisation of iteration protocol.
* Implement Stack, Queue, Linked List manually.

Day | Block-A | Block-B
---|---|---
Mon | Read RealPython *Understanding `__iter__` & `__next__`* 🔗. Implement custom range class. | Convert to generator function; compare memory via `sys.getsizeof`.
Tue | Stack: implement via Python list; benchmark push/pop 1e6 ops. | Queue: compare list vs `collections.deque` performance. Plot with `matplotlib`.
Wed | SinglyLinkedList: nodes with `__slots__` to save memory. Unit tests. | Implement `reverse()` method iteratively & recursively. 📓 difference.
Thu | DoublyLinkedList with sentinel head node. Visualize using `graphviz`. | C++ port: create `linked_list.cpp`; compile & run simple test; note pointer semantics.
Fri | Write comparative table (Stack vs Queue vs List). Commit to repo `docs/data_structures.md`. | Publish gist "Iterator patterns cheat-sheet".
Sat (3h) | 90 min: Solve 3 LeetCode mediums involving stacks (#739 Daily Temps, #155 Min Stack, #394 Decode String).  
90 min: record video explanation of one problem.
Sun (3h) | Weekly contest & retro. 🏁 Phase 1 complete; move to Phase 2 next week.

---

> **Next Up ▶️ Part 2** will cover **Weeks 5-8** (Pattern Pass ①) with day-level granularity. 

---
# ▶️ Deep-Dive Playbook · **Part 2** (Weeks 5-8 — Pattern Pass ①)
*Prereq: complete Part 1 through Week 4.*  
Purpose: transition from Python-fundamentals into pattern-driven DS&A mastery while keeping velocity high.

## Meta-Rhythm to Memorize
```
Mon  (Prep Day)   Pattern article + AlgoMonster intro + template walk-through
Tue  (Guided)     2 easy ↦ medium problems with editorials open
Wed  (Unguided)   2 mediums timed (≤30 m ea) + self-review
Thu  (Port & Concept) Re-implement yesterday's solutions in C++  ⟶ note memory diffs
Fri  (Meta)       Consolidate: Anki cards + pattern mind-map + one write-up
Sat  (Drill)      90 m LeetCode timed set + 30 m AlgoMonster quiz + 60 m Video review
Sun  (Contest)    LeetCode Weekly Contest → Retro + plan next week
```
⌚ **Block lengths** identical to Part 1 unless otherwise stated.

### Resource Legend (new)
* **AM-mod** = specific AlgoMonster module lesson number.
* **LC-#**  = LeetCode problem ID.
* **YT**    = YouTube video.

---
## Week 5 · *Arrays & Hashing*  🔑 
Checkpoint: internalise constant-time look-ups, frequency maps, and sliding counters.

Day | ⏲️ Block-A | ⏲️ Block-B
----|-----------|-----------
Mon | Read CodeInMotion Section 1 🔗; take hand-written notes. Implement generic counter template in `utils/counter.py`. | Watch YT *"Hash Tables by William Fiset"*; summarise collision-handling strategies 📓.
Tue | Guided LC: **LC-217 Contains Duplicate** + **LC-242 Valid Anagram** (editorial allowed). | Copy solutions into `arrays_hashing.py`; add doctest examples.
Wed | Timed mediums (**LC-347 Top K Freq Elements**, **LC-49 Group Anagrams**). Record start/stop; no editorials until done. | Self-review: identify 🐛 root-cause; paste snippet into *Oops List*.
Thu | Port both mediums to `arrays_hashing.cpp`; compile with `-fsanitize=address`. Note memory footprint diff vs Python. | Read AM-mod "Hashmap Intro" & finish 5 embedded quizzes.
Fri | Create 8 Anki cards (`dict` vs `unordered_map`, load-factor, amortized O(1)). | Mind-map pattern with Excalidraw; commit `design/arrays_hashing.svg`.
Sat | 90 m timed set: LC-1, LC-36, LC-295 easies/mediums. 30 m AM quiz. 60 m video review *NeetCode Array Patterns*. | –
Sun | Weekly contest + retro; fill Week-5 section in Ledger 📓. 🏁 **Target solves total: 24**.

---
## Week 6 · *Two Pointers & Sliding Window*  ↔️
Focus on fixed vs dynamic window sizing and opposite-direction search.

Day | ⏲️ Block-A | ⏲️ Block-B
----|-----------|-----------
Mon | AM-mod "Two Pointers Introduction"; manually trace palindrome example. | Implement template `two_pointer.py` (l,r while l<r)
Tue | Guided LC: **LC-125 Valid Palindrome** & **LC-167 Two Sum II**. | Add logging wrapper to visualize pointer moves; commit GIF using `asciinema`.
Wed | Unguided mediums: **LC-15 3-Sum** & **LC-11 Container With Most Water** (30 m each). | Write blog snippet "Choosing pointer movement heuristics".
Thu | Port to C++; optimise 3-Sum with early break + skip duplicates; benchmark 10k random arrays. | AM-mod "Sliding Window – Longest"; finish quiz.
Fri | Add 10 Anki Q-A: window invariants, when to shrink/grow. | Update mind-map `design/two_pointers.svg`.
Sat | Drill: 90 m set (LC-3, LC-76, LC-424). 30 m glass-box analysis of LC-76.* 60 m watch *Kevin Naughton sliding window* YT. |
Sun | Contest + retro. 🏁 **Cumulative solves: 40-45** (goal ≥ +18 this week).

---
## Week 7 · *Stack / Queue / Monotonic*  📚
Key Ideas: LIFO for context, monotonic property for O(N) next-greater queries.

Day | Block-A | Block-B
---|---|---
Mon | AM-mod "Stack Intro"; implement `MinStack` class (LC-155) as warm-up. | Watch YT *"Monotonic Stack Intuition – Errichto"*; write summary.
Tue | Guided: LC-20 Valid Parentheses & LC-150 Reverse Polish Notation. | Create comparative table push/pop complexity list vs deque vs custom node.
Wed | Unguided mediums: LC-739 Daily Temperatures, LC-853 Car Fleet. Time-box 35 m each. | Self-review; add to Oops List (# mis-handled equal temp case).
Thu | Port `dailyTemperatures` to C++. Use `vector<int>` & measure memory. | AM-mod "Monotonic Stack – Sliding Window Max" solve practice.
Fri | 8 Anki cards: monotonic increasing vs decreasing criteria, typical problems. | Mind-map commit.
Sat | 90 m set (LC-84, LC-901, LC-496). 30 m AM quiz. 60 m blog: "Monotonic Tomography".
Sun | Contest; weekly retro. 🏁 solve count target ≥ 65.

---
## Week 8 · *Prefix Sum / Intervals*  ➕➖
Goal: constant-time range queries, merge & sweep-line reasoning.

Day | Block-A | Block-B
---|---|---
Mon | Read CodedInMotion Section "Prefix Sum" + AM-mod "Prefix Sum". Build simple `build_prefix(arr)` util. | Implement LC-303 Range Sum Query – Immutable (class with pre-sum).
Tue | Guided: LC-238 Product of Array Except Self, LC-53 Maximum Subarray (Kadane variant). | Visualise prefix array with matplotlib; include in README.
Wed | Unguided mediums: LC-56 Merge Intervals, LC-435 Non-Overlapping Intervals. | Reflection on sorting by start & greedy removal order.
Thu | Port Merge Intervals to C++. Compare vector of pair vs struct. | AM-mod "Intervals" practise 3 tasks.
Fri | Create 10 Anki cards: prefix properties, inclusive/exclusive, interval edge cases. | Update design svg.
Sat | 90 m drill set (LC-57 Insert Interval, LC-252 Meeting Rooms, LC-128 Longest Consecutive Seq). 30 m quiz. 60 m watch YT *"Interval DP vs Greedy"* short.
Sun | Contest & retro. 🏁 **End-Phase-2 Milestone**: at least **110 → 120** new solves; ledger screenshots.

---
### Deliverables Check (EOW-8)
* `patterns/arrays_hashing.{py,cpp}` etc. committed.  
* 4 pattern mind-map SVGs.  
* Anki deck now ≥ 60 mature cards.  
* Solves total ≥ 110.  
* LinkedIn post "8-Week Pattern Sprint — halftime recap".

> 🟢 **Proceed to Part 3** for Weeks 9-12 (Pattern Pass ② + ML core) **once all above items are complete.** 

---
# ▶️ Deep-Dive Playbook · **Part 3** (Weeks 9-12 — Pattern Pass ② + ML Core)
*Prereq: complete Part 2 (Weeks 5-8).*  
These four weeks finish the core DS&A patterns **and** layer in foundational machine-learning math + classic models to leverage your existing ML strengths.

## Global meta-rhythm (unchanged)
Mon  pattern prep  •  Tue guided  •  Wed unguided  •  Thu C++ port + theory  •  Fri consolidation  •  Sat drill + ML notebook  •  Sun contest + retro

Additional rule: **Saturday 3-hour block** is split **120 min ML-math notebook + 60 min pattern quiz**.

---
## Week 9 · *Binary Search + Trees* 🌲
ML focus: Linear vs Logistic Regression – derivations, gradient descent, regularization.

Day | ⏲️ Block-A | ⏲️ Block-B
---|---|---
Mon | CodeInMotion "Binary Search" section. Implement vanilla template `bin_search(nums,target)`. | AM-mod "Vanilla Binary Search" lesson; complete quiz.
Tue | Guided LC: **LC-704 Binary Search** (easy) + **LC-153 Min Rotated Array** (medium). | Trees intro: read AM-mod "Everything About Trees"; sketch BST properties.
Wed | Unguided mediums: **LC-98 Validate BST**, **LC-230 Kth Smallest in BST**. | Self-review; add to Oops List (common off-by-one in recursion).
Thu | C++ ports; use iterative inorder w/ stack vs recursion. Benchmark 1e5 node tree. | ML theory: watch Andrew Ng Week 2 videos on gradient descent 🔗; jot derivations 📓.
Fri | Anki: 10 cards (binary search invariants, BST inorder facts, logistic cost function). | Mind-map binary search decision tree (`design/bin_search.svg`).
Sat (3h) | 2 h Jupyter: derive linear vs logistic, code gradient descent; verify vs scikit-learn.  | 1 h drill: LC-540 Single Element Sorted Array, LC-108 Sorted Array to BST.
Sun | Contest & retro. 🏁 Target cumulative solves ≥ 140.

---
## Week 10 · *Heaps / Priority Queue* ⛏️
ML focus: Decision Trees & Random Forest (gini, entropy, bias-variance).

Day | Block-A | Block-B
---|---|---
Mon | AM-mod "Heap Fundamentals"; implement min-heap wrapper class. | Visualize heap array indexes with draw.io.
Tue | Guided LC: **LC-215 Kth Largest Element** + **LC-347 Top-K Freq Elements** revisit with heap approach. | Blog snippet: min vs max heap conversion tricks.
Wed | Unguided mediums: **LC-502 IPO**, **LC-480 Sliding Window Median** (hard → allow 60 m). | Add to Oops List (multi-heap pitfalls).
Thu | C++ port using `<queue>` + custom comparator. Benchmark vs Python `heapq` for 1e6 inserts. | ML reading: *Hands-On ML* ch 6 Decision Trees (sections 6-1 → 6-3).
Fri | Create 12 Anki cards: heapify complexity, median of stream algorithm, gini vs entropy formulas. | Update `design/heap_queue.svg` mind-map.
Sat | 120 m notebook: train DecisionTree & RandomForest on Titanic; plot feature importance.  | 60 m drill: LC-973 K Closest Points, LC-295 Median Data Stream.
Sun | Contest & retro. 🏁 Solve total ≥ 165.

---
## Week 11 · *Tries & Backtracking* 🔤🔙
ML focus: Gradient Boosting (XGBoost / LightGBM basics).

Day | Block-A | Block-B
---|---|---
Mon | AM-mod "Trie Introduction"; code basic `TrieNode` class with insert/search. | Implement LC-208 Implement Trie (guided).
Tue | Guided backtracking: **LC-46 Permutations**, **LC-784 Letter Case Permutation**. | Reflection on recursion depth; note Python `sys.setrecursionlimit`.
Wed | Unguided medium/hard: **LC-212 Word Search II** (tries+dfs), **LC-37 Sudoku Solver**. | Self-review; annotate pruning strategies.
Thu | Port Word Search to C++; measure VM size; optimize by deleting leaf nodes. | Read *XGBoost paper* sec 3; note additive trees math.
Fri | Anki 10 cards: trie node memory calc, permutation count formula, boosting update formula. | Mind-map `design/tries_backtracking.svg`.
Sat | 2 h ML notebook: train XGBoost on Kaggle Titanic, compare ROC AUC vs RF; tune learning_rate & n_estimators.  | 1 h drill: LC-78 Subsets, LC-90 Subsets II.
Sun | Contest & retro. 🏁 Solve total ≥ 190.

---
## Week 12 · *Graphs (BFS / DFS / Union-Find)* 🌐
ML focus: Unsupervised – K-Means, PCA, t-SNE

Day | Block-A | Block-B
---|---|---
Mon | AM-mod "Graph Fundamentals" + draw adjacency-list vs matrix. Implement BFS template. | Guided: **LC-133 Clone Graph** using BFS hashmap.
Tue | Guided Union-Find: **LC-547 Number of Provinces**, write DSU class with path compression+rank. | Quiz via AM-mod "DSU Introductory Problem".
Wed | Unguided mediums: **LC-200 Number of Islands** (DFS), **LC-417 Pacific Atlantic Water Flow**. | Self-review; note recursion vs queue memory.
Thu | C++ port DSU + BFS grid solution; compile with `-O2 -march=native`. | Read sklearn PCA tutorial; run toy 2-D example.
Fri | Anki 12 cards: DSU ops, BFS queue invariants, PCA variance explained. | Mind-map `design/graphs.svg`.
Sat | 2 h notebook: run K-Means on Iris; plot clusters; run t-SNE visualisation.  | 1 h drill: LC-994 Rotting Oranges, LC-695 Max Area of Island.
Sun | Contest + **Phase-3 retro**: summarise ML notebooks, DS&A progress, adjust weak-pattern list. 🏁 **Milestone**: 220 solves + 4 ML notebooks finished.

---
### Phase-3 Deliverable Recap
• 8 pattern mind-maps total • Anki deck ≈ 100 cards mature • GitHub repo `ml_notebooks/` with 4 notebooks (linear/logistic, trees/forest, boosting, unsupervised) • Contest percentile trend chart added to README.

> **Ready for Part 4 (Weeks 13-15: System Design + MLOps) once milestones met.** 

---
# ▶️ Deep-Dive Playbook · **Part 4** (Weeks 13-15 — System Design & MLOps)
*Prereq: complete Part 3 (Weeks 9-12).*  
These three weeks pivot from pure algorithms to **systems thinking**—designing scalable ML services, setting up CI/CD, and deploying models with observability.

## Macro-layout
Mon  concept read/watch  •  Tue guided design doc  •  Wed hands-on prototype  •  Thu refactor & peer review  •  Fri consolidation (anki + diagram)  •  Sat 3-h build session  •  Sun retro & prep.

---
## Week 13 · *System-Design Primer*  🏗️
**Objectives**
1. Understand core SD components: load balancer, cache, sharding, replication, CAP.  
2. Draft high-level design for a **low-latency inference API** (LLIA).

Day | ⏲️ Block-A | ⏲️ Block-B
---|---|---
Mon | Read Grokking Ch 1-3 (Scalability, Reliability, Availability). Summarise each in ledger. | Watch ByteByteGo video *"Design Twitter Timeline"*; note patterns 📓.
Tue | Guided design: follow AlgoMonster SD template to outline LLIA (users → LB → ASG → inference pods). | Add capacity estimates (QPS, p99 latency) using Google SRE docs for ref.
Wed | Prototype: scaffold FastAPI endpoint returning dummy prediction; add Nginx `docker-compose` load balancer. | Locust load-test locally; collect latency histogram.
Thu | Peer review (rubber-duck): record Loom walk-through; create GitHub PR; request feedback. | Refactor infra docker-compose → `docker-compose.override.yml` for scale param.
Fri | Anki 8 cards: why LB 4-tuple hashing, write-through vs write-back cache. | Diagram LLIA with draw.io; save `design/llia_overview.svg`.
Sat (3h) | 2 h: implement Redis cache for model outputs; measure cache hit latency.  
1 h: write ADR (architecture decision record) #1 for cache selection. |
Sun | Retro; list pro/cons in ledger; plan Week 14. 🏁 Git tag `system_design/LLIA_v0.1`.

---
## Week 14 · *Data Pipelines & Feature Store*  🗄️
**Objectives**
1. Build minimal batch ETL → SQLite feature store via **Prefect**.  
2. Understand online/offline consistency & back-fill.

Day | Block-A | Block-B
---|---|---
Mon | Read Airbnb feature-store blog + Feast docs overview 🔗. Note feature/entity defs. | Sketch entities for Titanic dataset (passenger_id). Commit `docs/feature_defs.md`.
Tue | Guided: Prefect tutorial (deployment 2.0). Build flow: raw CSV → clean fns → write parquet. | Schedule flow daily on local Prefect server; parameterise file path.
Wed | Add offline store: ingest parquet into SQLite via `pandas.to_sql`. Test `SELECT *`. | Add Feast offline store config (SQLite) & run `feast materialize`.
Thu | Implement online store stub: Redis; run `feast apply`, push 100 records. | FastAPI endpoint `/features/{passenger_id}` retrieving online features.
Fri | Anki 10 cards: feature freshness, back-fill, offline/online sync, Prefect task states. | Diagram pipeline swim-lane `design/feature_pipeline.svg`.
Sat | 2 h: Load data drift via Evidently dataset drift report comparing day-1 vs day-7.  
1 h: Blog "Building a tiny feature store in a weekend". |
Sun | Retro: latency stats, storage size, issue list. Push tag `feature_store_v0.1`.

---
## Week 15 · *Docker, MLflow, Monitoring*  🚢📈
**Objectives**
1. Containerize model service; build CI/CD via GitHub Actions.  
2. Track experiments with MLflow; add Evidently drift monitor.

Day | Block-A | Block-B
---|---|---
Mon | Follow TechWorld-with-Nana Docker crash-course chap 1-3. Build Dockerfile for LLIA. | Run `docker scan` for vuln check; reduce image size with multi-stage build (slim). 
Tue | Set up GitHub Action: on push to `main`, build & push image to GHCR; run pytest inside container. | Configure `docker-compose.prod.yml` referencing GHCR image tag.
Wed | Integrate MLflow tracking: wrap training script for XGBoost (Week 11) to log params, metrics, model. | Register model, mark `staging` stage. Snapshot UI screenshot into repo `docs/screens/`.
Thu | Add Evidently service as sidecar container; monitor prediction drift; route metrics to `/metrics`. | Read Prometheus + Grafana docker-compose example; spin up for local.
Fri | Anki 12 cards: MLflow lifecycle, Docker layering, semantic version tags, Prom pull vs push. | Diagram CI/CD pipeline `design/cicd.svg`.
Sat | 2 h: Chaos test ‑ kill container; validate auto-restart via `restart: always`. 1 h: polish README deployment guide. |
Sun | **Phase-4 retro**: compile accomplishments; update LinkedIn ("Built LL inference infra with CI/CD & monitoring"). 🏁 Tag `v1.0` end-to-end project.

---
### Phase-4 Exit Criteria
• Dockerized inference service deployed locally with GH Actions build.  
• Prefect + Feast demo feature pipeline running.  
• MLflow UI shows ≥3 experiments; Evidently drift report generated.  
• Anki deck ≥130 cards; 11 system-design diagrams committed.  
• Ledger includes ADR #1 (cache) & ADR #2 (feature store technology).

> 🚀 **Final Part 5 (Week 16 — Mock Loops & Launch)** already exists in core roadmap. Proceed to full-scale mock interviews once above infra is operational.

---
# ▶️ Deep-Dive Playbook · **Part 5** (Week 16 — Mock Loops & Launch)
*Prereq: complete Part 4 infra.*  
Final sprint focuses on polishing communication skills, timed mocks, and job-search collateral.

## Week 16 · *Mock Interviews, Resume Polish, Outreach*  🎯

### High-level structure
* **Mon-Wed**: Three full mock loops (DS&A, behavioral, system design)  
* **Thu**: Address feedback; targeted remedial practice  
* **Fri**: Final résumé & portfolio polish  
* **Sat-Sun**: Outreach & applications + decompression

### Detailed day schedule
Day | ⏲️ Block-A (90 m) | ⏲️ Block-B (90 m)
---|---|---
Mon | **Mock Loop A** – Pramp DS&A session (45 m) + 15 m immediate notes, 30 m break/reflect. | Behavioral interview w/ peer: record Zoom; use STAR. 15 m self-critique; 30 m update Ledger.
Tue | **Mock Loop B** – Interviewing.io anonymous DS&A (60 m). | System-Design mock (peer or Exponent) designing "Realtime Chat Service"; 30 m feedback digest.
Wed | **Mock Loop C** – LeetCode assessment mode: 2 h/2 Q medium-hard; treat as onsite coding signal. | Review all feedback; compile list of recurring gaps (e.g., edge-case enumeration, complexity articulation).
Thu | Remediation hour: drill weak pattern (e.g., Graph Union-Find) – solve 3 mediums timed. | Record 5-min elevator-pitch video; practice into webcam; refine bullet points.
Fri | Update résumé: quantify projects ("CIFAR-10 ResNet service: 50 ms p99 latency @ 100 QPS on 2-core instance"). Run through **Resumake** linter. | Polish GitHub READMEs; pin top repos; add shields (build, codecov, Docker pulls). Publish personal site on GitHub Pages.
Sat | Job-search batch:  
• Send referral asks to 5 LinkedIn contacts (templated msg)  
• Apply to Google, Meta, Amazon, Microsoft, Apple portals with tailored résumé. | Draft follow-up email templates. Backup Ledger & Anki deck to cloud.
Sun | Light contest for momentum; otherwise REST/celebration. | Weekly + **Program** retrospective: write 1-page summary — accomplishments, metrics, next steps (system-design deepening, open-source contributions).

### Resources & Tools
* Pramp free mock scheduling – <https://www.pramp.com/>  
* Interviewing.io – <https://interviewing.io/>  
* STAR framework refresher article – <https://www.themuse.com/advice/star-interview-method>  
* Exponent system-design mocks (optional 💲).  
* Resumake – <https://resumake.io/>  
* GitHub Badges cheat-sheet – <https://shields.io/>  
* Elevator-pitch tips (HackerRank blog).

### Final Program Checklist ✅
Section | Target | Status
---|---|---
DS&A Solves | ≥ 300 (60 % medium, 15 % hard) | ☐
Mock Interviews | ≥ 5 total; ≥ 2 "Strong Hire" DS&A; ≥ 1 "Hire" system-design | ☐
Projects | FlashCard CLI, Feature Store pipeline, LL inference service w/ CI/CD | ☐
Documentation | Mind-maps (≥ 11), ADRs (≥ 2), diagrams (LLIA, pipeline, CICD) | ☐
Anki Deck | ≥ 150 mature cards; daily reviews streak ≥ 30 days | ☐
Public Portfolio | GitHub pinned repos, personal site, LinkedIn article series (≥ 3) | ☐
Job Outreach | ≥ 10 applications w/ referrals/contact emails | ☐

When all boxes are ticked, **celebrate**—then maintain momentum with weekly contests, system-design YouTube breakdowns, and continuous OSS contributions.

---
## 🎉 Epilogue: Sustain & Grow
1. **Weekly**: 1 LeetCode hard, 1 system-design article, Anki maintenance.  
2. **Monthly**: Contribute PR to open-source ML infra; write blog.  
3. **Quarterly**: Re-run full mock interview loop; update résumé metrics.

> "Preparation isn't punishment; it's the fastest path to confidence."

*End of 16-Week Roadmap.*