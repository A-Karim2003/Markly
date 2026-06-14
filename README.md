# Markly

![Markly Logo](public/logo-dark.png)

A comprehensive grade tracking platform designed specifically for University of Essex Computer Science students. Markly enables students to monitor their academic performance, track module assessments, and visualize their progress toward degree classification goals.

## Overview

Markly is a web-based application that simplifies academic record-keeping for computer science students. Built with modern web technologies, it provides an intuitive interface for managing module information, logging assessment grades, and gaining insights into overall academic performance through weighted grade calculations and progress analytics.

## Features

### Dashboard

![Dashboard](public/dashboard.png)

The dashboard provides a comprehensive overview of your academic journey:

- **Year Average**: Calculated from all graded assessments using a weighted average, with each assessment contributing according to its weight. For example, if three assessments are worth 30%, 40%, and 30% and the grades are 75%, 82%, and 88%, the year average is calculated as `(75 × 0.30 + 82 × 0.40 + 88 × 0.30) / (0.30 + 0.40 + 0.30) = 81.7%`
- **Credits Tracked**: Visual representation of completed versus total credits (120 total)
- **Modules On Track**: Count of modules where you are on track to meet your target degree classification
- **Performance Metrics**: A visual sparkline that illustrates the overall grade summary, including the weighted average calculation shown above

### Module Management

![Modules Section](public/sectionImages/modules_section_image.png)

- Enroll in core and optional modules from the University of Essex Computer Science curriculum
- View complete module information including credits and assessment structure
- Track progress within each module across multiple assessment types
- Support for 33+ modules across levels 4, 5, and 6

### Module Detail

![Module Detail](public/sectionImages/module_detail.png)

The module detail view gives students a full breakdown of a single module so they can understand exactly how their grade is built and what remains to be completed. Because different assessments carry different weights, Markly uses those weights when calculating both the current grade and the grade still required to reach the target classification. It includes:

- Current module grade and target grade
- Overall progress through the assessment scheme
- Remaining grade required to achieve the target classification
- A table of assessments showing grade, weight, contribution, and status
- Quick actions for updating or removing assessment entries

### Assessment Tracking

![Assessments Section](public/sectionImages/assessments_section_image.png)

- View pending and completed assessments across your modules
- Filter between completed and pending assessments
- Review assessment weights, grades, and module contributions in one place

### Grade Calculations & Weighted Averages

Markly uses sophisticated weighted average calculations to provide accurate academic insights:

#### Year Average Calculation

The year average represents your overall performance across all modules:

```
Year Average = Sum(Assessment Grade × Assessment Weight) / Sum(Assessment Weights)
```

For example, if you have:

- Assessment 1: 75% with weight 0.30
- Assessment 2: 82% with weight 0.40
- Assessment 3: 88% with weight 0.30

Your weighted average would be: (75×0.30 + 82×0.40 + 88×0.30) / 1.0 = 81.7%

#### Module Grade Calculation

Each module combines multiple assessment components according to the assessment scheme:

```
Module Grade = Sum(Assessment Grade × Component Weight) / Sum(Component Weights)
```

Assessment weights are determined by the module's official assessment scheme and may include coursework, exams, practical components, and projects.

#### Target Grade Tracking

For each module, Markly calculates whether you are "on track" to achieve your target degree classification:

```
Required Grade for Remaining = (Target Grade - Current Grade) / Remaining Weight
```

If this value is ≤ 100, the module is marked as "on track."

### Profile & Settings

- Manage your student profile and personal information
- Set your target degree classification (First, 2:1, or 2:2)
- View and update your enrolled modules
- Customize your learning preferences

## Module Coverage

Markly supports all computer science modules across three academic levels:

**Level 4 (Year 1)**

- CE101: Team Project Challenge
- CE141: Mathematics for Computing
- CE151: Introduction to Programming
- CE152: Object-Oriented Programming
- CE153: Introduction to Databases
- CE154: Web Development
- CE104: Data Structures and Algorithms I
- CE161: Fundamentals of Digital Systems

**Level 5 (Year 2)**

- CE201: Team Project Challenge
- CE202: Software Engineering
- CE203: Application Programming
- CE204: Data Structures and Algorithms II
- CE205: Databases and Information Retrieval
- CE207: Introduction to Data Science
- CE212: Web Application Programming
- CE213: Introduction to Artificial Intelligence
- CE217: Computer Game Design
- CE218: Computer Game Programming
- CE221: C++ Programming
- CE231: Computer and Data Networks
- CE235: Computer Security

**Level 6 (Final Year)**

- CE301: Individual Capstone Project Challenge
- CE303: Advanced Programming
- CE305: Languages and Compilers
- CE310: Evolutionary Computation and Genetic Programming
- CE314: Natural Language Engineering
- CE316: Computer Vision
- CE318: High-Level Games Development
- CE320: Large Scale Software Systems and Extreme Programming
- CE321: Network Engineering
- CE324: Network Security
- CE326: Machine Learning
- CE812: Physics-Based Games

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A modern web browser
- University of Essex account credentials
- Supabase account (backend infrastructure)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd markly
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file in the project root with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Technology Stack

**Frontend:**

- Next.js 16 - React framework with server-side rendering
- React 19 - UI library
- TypeScript - Type-safe development
- TailwindCSS - Utility-first CSS framework
- Recharts - Data visualization library
- Lucide React - Icon library

**Backend:**

- Supabase - PostgreSQL database with authentication
- Better Auth - Authentication management
- React Hook Form - Form handling
- Zod - Schema validation

**Styling & UI:**

- shadcn/ui - High-quality React components
- Radix UI - Accessible component primitives
- Tailwind CSS - Utility-first CSS framework

**State Management:**

- Zustand - Lightweight state management
- React Context - Built-in state management

## Onboarding Flow

New students complete a structured onboarding process:

1. **Authentication** - Sign up or sign in with university credentials
2. **Profile Setup** - Configure personal information and target grade
3. **Module Selection** - Choose core and optional modules for the current year
4. **Ready to Track** - Begin logging assessments and monitoring progress

## Understanding Your Grade Data

### Degree Classifications

Markly tracks progress toward the following UK degree classifications:

| Classification     | Range   | Target |
| ------------------ | ------- | ------ |
| First              | 70-100% | 70%+   |
| Upper Second (2:1) | 60-69%  | 60%+   |
| Lower Second (2:2) | 50-59%  | 50%+   |

### Assessment Types

Different modules use various assessment methods:

- **Coursework**: Submitted written work or projects
- **Exam**: Formal examination component
- **Practical**: Lab work or practical assignments
- **Presentation**: Oral presentations or demonstrations
- **Project**: Extended project work or capstone projects

Each assessment type has an assigned weight that contributes to the final module grade.

### Important Notes

- Weighted averages are calculated automatically as assessments are logged
- All calculations follow University of Essex assessment regulations
- Year average reflects only completed assessments; missing assessments are excluded
- Module grades update in real-time as new assessment grades are entered
- Target tracking assumes you will achieve 100% on all remaining assessments

## Features in Detail

### Real-Time Analytics

- Watch your year average update as you log new grades
- Monitor progress toward your degree classification goal
- Identify which modules need improvement

### Flexible Assessment Logging

- Add custom assessments beyond the standard scheme
- Adjust assessment weights if needed
- Record assessments as you complete them throughout the year

### Progress Visualization

- Sparkline charts showing performance trends
- Progress bars for credit accumulation
- Color-coded indicators for module performance

### Mobile-Responsive Design

- Fully functional on mobile devices and tablets
- Optimized for studying on the go
- Touch-friendly interface

## Privacy & Security

- All data is stored securely in Supabase
- Authentication is managed through Better Auth
- Row-level security policies ensure students can only access their own data
- HTTPS encryption for all data in transit

## Feedback & Support

For issues, feature requests, or general feedback, please contact the development team or submit an issue through the repository.

## Academic Integrity

Markly is a personal academic tracking tool. Grades entered into the system should accurately reflect your official assessment results. This application is designed to help you understand and monitor your own progress, not to misrepresent your academic achievements.

## License

This project is proprietary software for use by University of Essex students. Unauthorized copying or distribution is prohibited.

## Acknowledgments

Designed and built for University of Essex Computer Science students. Special thanks to all students who provided feedback during development.

---

**Last Updated**: June 2026  
**Version**: 0.1.0
