#!/usr/bin/env python3
"""
Enhanced AI-Powered Roadmap Parser
Extracts detailed weekly content from the comprehensive markdown roadmap
"""

import re
import json
import os
from typing import Dict, List, Any
from pathlib import Path

class EnhancedRoadmapParser:
    def __init__(self, markdown_file: str):
        self.markdown_file = markdown_file
        self.content = ""
        self.weeks_data = {}
        self.phases_data = []
        
    def load_markdown(self):
        """Load the main roadmap markdown file"""
        try:
            with open(self.markdown_file, 'r', encoding='utf-8') as f:
                self.content = f.read()
            print(f"✅ Loaded {len(self.content)} characters from {self.markdown_file}")
        except FileNotFoundError:
            print(f"❌ Error: Could not find {self.markdown_file}")
            return False
        return True
    
    def extract_week_data(self, week_num: int) -> Dict[str, Any]:
        """Extract detailed data for a specific week"""
        
        # Look for week pattern: "### **Week X:" or "### Week X:"
        week_pattern = rf"###\s*\*?\*?Week\s+{week_num}[:\s]([^#\n]*?)(?:\*\*)?[\n\r]"
        week_match = re.search(week_pattern, self.content, re.IGNORECASE)
        
        if not week_match:
            # Return default structure if week not found
            return self.create_default_week(week_num)
        
        # Extract title from the match
        title = week_match.group(1).strip().rstrip('*').strip()
        if not title:
            title = f"Week {week_num} Advanced Training"
        
        # Find the start and end of this week's content
        week_start = week_match.start()
        
        # Find next week or end of content
        next_week_pattern = rf"###\s*\*?\*?Week\s+{week_num + 1}[:\s]"
        next_week_match = re.search(next_week_pattern, self.content[week_start:], re.IGNORECASE)
        
        if next_week_match:
            week_end = week_start + next_week_match.start()
        else:
            # Find next major section or end of content
            next_section = re.search(r"\n##[^#]", self.content[week_start:])
            week_end = week_start + next_section.start() if next_section else len(self.content)
        
        week_content = self.content[week_start:week_end]
        
        # Extract objectives (looking for patterns like "🎯 Target:", "**🎯", etc.)
        objectives = self.extract_objectives(week_content)
        
        # Extract daily sessions
        sessions = self.extract_sessions(week_content, week_num)
        
        # Extract AI prompts
        ai_prompts = self.extract_ai_prompts(week_content, week_num)
        
        return {
            "title": title,
            "objectives": objectives,
            "sessions": sessions,
            "ai_prompts": ai_prompts
        }
    
    def extract_objectives(self, content: str) -> List[str]:
        """Extract learning objectives from week content"""
        objectives = []
        
        # Look for target/goal patterns
        target_patterns = [
            r"🎯\s*Target[:\s]*([^🎯\n]*)",
            r"🎯\s*([^🎯\n\r]*)",
            r"\*\*🎯[^:]*:\*\*\s*([^🎯\n]*)",
            r"Target:\s*([^🎯\n]*)",
            r"Goals?:\s*([^🎯\n]*)"
        ]
        
        for pattern in target_patterns:
            matches = re.findall(pattern, content, re.IGNORECASE | re.MULTILINE)
            for match in matches:
                clean_objective = re.sub(r'\*+', '', match).strip()
                if clean_objective and len(clean_objective) > 10:
                    objectives.append(clean_objective)
        
        # Look for completion checklists
        checklist_pattern = r"- \[ \]\s*([^[\n]*)"
        checklist_matches = re.findall(checklist_pattern, content)
        for match in checklist_matches:
            clean_item = match.strip()
            if len(clean_item) > 15:
                objectives.append(clean_item)
        
        # If no specific objectives found, extract from general content
        if not objectives:
            # Look for bullet points that might be objectives
            bullet_pattern = r"[-*]\s*([^-*\n]{20,})"
            bullets = re.findall(bullet_pattern, content)
            for bullet in bullets[:4]:  # Limit to 4 objectives
                clean_bullet = re.sub(r'[🎯💻🔬🏢🎤📊]+', '', bullet).strip()
                if len(clean_bullet) > 15:
                    objectives.append(clean_bullet)
        
        # Default objectives if none found
        if not objectives:
            objectives = [
                "Advanced learning objectives with AI enhancement",
                "Company-specific interview preparation", 
                "Portfolio project development and optimization",
                "Mock interview practice with AI feedback"
            ]
        
        return objectives[:6]  # Limit to 6 objectives
    
    def extract_sessions(self, content: str, week_num: int) -> List[Dict[str, Any]]:
        """Extract daily sessions from week content"""
        sessions = []
        
        # Look for day patterns
        day_patterns = [
            r"####\s*\*?\*?Day\s+\d+[^:]*:([^#\n]*)",
            r"\*\*Day\s+\d+[^:]*:\*\*([^*\n]*)",
            r"Day\s+\d+[^:]*:([^\n]*)"
        ]
        
        session_times = [
            ("6:00-7:30 AM", "Morning Session"),
            ("7:00-8:30 AM", "Coding Session"),
            ("8:00-9:30 PM", "Evening Session")
        ]
        
        # Extract specific session information
        for i, (time_slot, session_type) in enumerate(session_times):
            session_id = f"{week_num}-{session_type.lower().replace(' ', '_')}"
            
            # Look for session content in the week
            session_content = self.extract_session_content(content, session_type, time_slot)
            
            session = {
                "id": session_id,
                "title": f"{session_type}: {session_content['title']}" if session_content['title'] else f"{session_type}: Advanced Concepts",
                "time": time_slot,
                "description": session_content['description'] if session_content['description'] else f"Advanced {session_type.lower()} with AI coaching",
                "duration": 90,
                "tags": session_content['tags'] if session_content['tags'] else ["Advanced", "AI-Coaching", "Practice"],
                "completed": False
            }
            
            sessions.append(session)
        
        return sessions
    
    def extract_session_content(self, content: str, session_type: str, time_slot: str) -> Dict[str, Any]:
        """Extract specific content for a session"""
        # Look for session blocks
        session_pattern = rf"\*\*{session_type}[^*]*\*\*[:\s]*\n(.*?)(?=\*\*[^*]*\*\*|\n####|\n###|$)"
        session_match = re.search(session_pattern, content, re.DOTALL | re.IGNORECASE)
        
        if session_match:
            session_text = session_match.group(1)
            
            # Extract title from first meaningful line
            lines = [line.strip() for line in session_text.split('\n') if line.strip()]
            title_line = lines[0] if lines else ""
            title = re.sub(r'[-*]\s*\*?\*?\d+:\d+[-\d+:\s]*\*?\*?:?\s*', '', title_line).strip()
            title = re.sub(r'[🎯💻🔬🏢🎤📊🚀]+', '', title).strip()
            
            # Extract description from content
            description_parts = []
            for line in lines[1:3]:  # Take next 2 lines for description
                clean_line = re.sub(r'[-*]\s*\*?\*?\d+:\d+[-\d+:\s]*\*?\*?:?\s*', '', line)
                clean_line = re.sub(r'[🎯💻🔬🏢🎤📊🚀]+', '', clean_line).strip()
                if clean_line and len(clean_line) > 10:
                    description_parts.append(clean_line)
            
            description = ". ".join(description_parts) if description_parts else ""
            
            # Extract tags from content
            tags = []
            if 'coding' in session_text.lower() or 'leetcode' in session_text.lower():
                tags.append("Coding")
            if 'ai' in session_text.lower() or 'coaching' in session_text.lower():
                tags.append("AI-Coaching")
            if 'interview' in session_text.lower() or 'mock' in session_text.lower():
                tags.append("Interview")
            if 'theory' in session_text.lower() or 'study' in session_text.lower():
                tags.append("Theory")
                
            if not tags:
                tags = ["Advanced", "Practice"]
            
            return {
                "title": title,
                "description": description,
                "tags": tags
            }
        
        return {"title": "", "description": "", "tags": []}
    
    def extract_ai_prompts(self, content: str, week_num: int) -> List[Dict[str, str]]:
        """Extract AI prompts for the week"""
        prompts = []
        
        # Look for existing AI prompt patterns
        prompt_patterns = [
            r"AI[^:]*:\s*[\"']([^\"']{20,})[\"']",
            r"🤖[^:]*:\s*[\"']([^\"']{20,})[\"']",
            r"Prompt[^:]*:\s*[\"']([^\"']{20,})[\"']"
        ]
        
        for pattern in prompt_patterns:
            matches = re.findall(pattern, content, re.IGNORECASE | re.DOTALL)
            for match in matches:
                clean_prompt = match.strip()
                if len(clean_prompt) > 20:
                    prompts.append({
                        "category": "AI Coaching",
                        "text": clean_prompt
                    })
        
        # Generate week-specific prompts based on content
        if not prompts:
            # Analyze content to determine focus areas
            if 'array' in content.lower() or 'hash' in content.lower():
                prompts.extend([
                    {
                        "category": "Problem Solving",
                        "text": f"Help me master arrays and hashing patterns for Week {week_num}. Explain optimal approaches, time complexity, and provide coding feedback."
                    },
                    {
                        "category": "Interview Practice",
                        "text": f"Simulate technical interviews for Week {week_num} array and hashing problems. Evaluate my problem-solving approach and communication."
                    }
                ])
            elif 'pointer' in content.lower() or 'sliding' in content.lower():
                prompts.extend([
                    {
                        "category": "Problem Solving", 
                        "text": f"Guide me through two-pointer and sliding window techniques for Week {week_num}. Focus on pattern recognition and optimization."
                    },
                    {
                        "category": "Interview Practice",
                        "text": f"Conduct mock interviews for Week {week_num} two-pointer problems. Provide real-time feedback on my approach."
                    }
                ])
            elif 'binary search' in content.lower():
                prompts.extend([
                    {
                        "category": "Problem Solving",
                        "text": f"Help me master binary search patterns for Week {week_num}. Explain boundary conditions and complex search spaces."
                    },
                    {
                        "category": "Interview Practice",
                        "text": f"Practice advanced binary search problems for Week {week_num}. Focus on mathematical intuition and optimization."
                    }
                ])
            else:
                # Default prompts
                prompts.extend([
                    {
                        "category": "Problem Solving",
                        "text": f"Help me with Week {week_num} advanced problem solving. Explain patterns, optimal approaches, and provide detailed feedback."
                    },
                    {
                        "category": "Interview Practice",
                        "text": f"Simulate technical interviews for Week {week_num} topics. Evaluate my problem-solving methodology and communication skills."
                    }
                ])
            
            # Always add a learning strategy prompt
            prompts.append({
                "category": "Learning Strategy",
                "text": f"Based on my Week {week_num} progress, provide personalized study recommendations and identify areas needing focus."
            })
        
        return prompts[:3]  # Limit to 3 prompts
    
    def create_default_week(self, week_num: int) -> Dict[str, Any]:
        """Create default week structure when detailed content isn't found"""
        return {
            "title": f"Week {week_num} Advanced Training",
            "objectives": [
                "Advanced learning objectives with AI enhancement",
                "Company-specific interview preparation", 
                "Portfolio project development and optimization",
                "Mock interview practice with AI feedback"
            ],
            "sessions": [
                {
                    "id": f"{week_num}-morning_session",
                    "title": "Morning Session: Advanced Concepts",
                    "time": "6:00-7:30 AM",
                    "description": "Advanced theoretical learning with AI enhancement",
                    "duration": 90,
                    "tags": ["Advanced", "Theory", "AI"],
                    "completed": False
                },
                {
                    "id": f"{week_num}-evening_session",
                    "title": "Evening Session: Implementation Practice", 
                    "time": "8:00-9:30 PM",
                    "description": "Advanced practical implementation with AI feedback",
                    "duration": 90,
                    "tags": ["Advanced", "Practice", "AI"],
                    "completed": False
                }
            ],
            "ai_prompts": [
                {
                    "category": "Advanced Problem Solving",
                    "text": f"Help me solve advanced Week {week_num} problems with optimal approaches and detailed analysis."
                },
                {
                    "category": "Interview Preparation", 
                    "text": f"Provide advanced interview coaching for Week {week_num} topics with company-specific guidance."
                }
            ]
        }
    
    def extract_phases(self) -> List[Dict[str, Any]]:
        """Extract phase information"""
        phases = [
            {
                "number": 1,
                "name": "Foundation & Basic Patterns",
                "description": "Master fundamental data structures and algorithms with AI coaching",
                "weeks": [1, 2, 3, 4],
                "focus_areas": ["Arrays & Hashing", "Two Pointers", "Sliding Window", "Binary Search"]
            },
            {
                "number": 2, 
                "name": "Advanced Data Structures",
                "description": "Deep dive into complex data structures and algorithms",
                "weeks": [5, 6, 7, 8],
                "focus_areas": ["Linked Lists", "Trees", "Heaps", "Graphs"]
            },
            {
                "number": 3,
                "name": "Dynamic Programming & Greedy",
                "description": "Master optimization techniques and mathematical problem solving",
                "weeks": [9, 10, 11, 12],
                "focus_areas": ["Dynamic Programming", "Greedy Algorithms", "Backtracking", "Math"]
            },
            {
                "number": 4,
                "name": "System Design & Advanced Topics", 
                "description": "Learn system design and advanced algorithmic concepts",
                "weeks": [13, 14, 15, 16],
                "focus_areas": ["System Design", "Advanced Graphs", "Trie", "Intervals"]
            },
            {
                "number": 5,
                "name": "Interview Mastery & Specialization",
                "description": "Company-specific preparation and interview mastery",
                "weeks": [17, 18, 19, 20],
                "focus_areas": ["Mock Interviews", "Company Prep", "Optimization", "Final Projects"]
            }
        ]
        return phases
    
    def parse_all_weeks(self):
        """Parse all 20 weeks from the roadmap"""
        print("🔍 Extracting detailed content for all 20 weeks...")
        
        for week_num in range(1, 21):
            print(f"📚 Processing Week {week_num}...")
            week_data = self.extract_week_data(week_num)
            self.weeks_data[str(week_num)] = week_data
            
            # Show progress
            if week_data["title"] != f"Week {week_num} Advanced Training":
                print(f"  ✅ Found detailed content: {week_data['title']}")
            else:
                print(f"  ⚠️  Using default content for Week {week_num}")
        
        self.phases_data = self.extract_phases()
        print(f"✅ Completed parsing all weeks. Found detailed content for multiple weeks.")
    
    def generate_json(self, output_file: str):
        """Generate the complete JSON roadmap data"""
        roadmap_data = {
            "metadata": {
                "title": "AI-Enhanced ML-FAANG Mastery Plan",
                "description": "20-week comprehensive roadmap for ML researchers transitioning to FAANG software engineering roles with AI-powered learning assistance",
                "total_weeks": 20,
                "total_phases": 5,
                "ai_enhanced": True,
                "last_updated": "2024-12-28"
            },
            "phases": self.phases_data,
            "weeks": self.weeks_data,
            "progress_tracking": {
                "completed_sessions": {},
                "metrics": {
                    "leetcode_solved": 0,
                    "mock_interviews": 0, 
                    "portfolio_projects": 0,
                    "study_hours": 0
                }
            }
        }
        
        # Save to file
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(roadmap_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Generated enhanced roadmap JSON: {output_file}")
        print(f"📊 Total weeks: {len(self.weeks_data)}")
        print(f"📊 Total sessions: {sum(len(week['sessions']) for week in self.weeks_data.values())}")
        print(f"📊 Total AI prompts: {sum(len(week['ai_prompts']) for week in self.weeks_data.values())}")
        
        return roadmap_data

def main():
    """Main execution function"""
    print("🚀 Enhanced AI-Powered Roadmap Parser Starting...")
    
    # Setup paths
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    markdown_file = project_root / "docs" / "AI_Enhanced_ML_FAANG_Mastery_Plan.md"
    output_file = project_root / "app" / "roadmap_data.json"
    
    # Initialize parser
    parser = EnhancedRoadmapParser(str(markdown_file))
    
    # Load and parse
    if not parser.load_markdown():
        return
    
    parser.parse_all_weeks()
    roadmap_data = parser.generate_json(str(output_file))
    
    print("\n🎉 Enhanced roadmap parsing completed successfully!")
    print(f"📱 Interactive app ready with rich content from {markdown_file}")
    print(f"🌐 Load {output_file} in your web browser to see the enhanced experience")

if __name__ == "__main__":
    main() 