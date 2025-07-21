# Quote Genie Pro - Application Prompt & Documentation

## Business Overview

**Application Name**: Quote Genie Pro
**Tagline**: AI-Powered Holiday Lighting Quotes
**Industry**: Holiday Lighting Installation Services
**Business Model**: Service-based quote generation and management system

## Core Business Purpose

Quote Genie Pro is a comprehensive web application designed for holiday lighting service companies to:

1. **Generate Accurate Quotes**: AI-powered property analysis combined with automated quote generation
2. **Manage Customer Relationships**: Complete customer information management and quote tracking
3. **Streamline Operations**: From initial customer contact through quote approval and service delivery
4. **Optimize Pricing**: Dynamic pricing based on property characteristics and service complexity

## Target Market

- Holiday lighting installation companies
- Seasonal decoration service providers  
- Small to medium-sized lighting contractors
- Companies serving residential properties in suburban areas (primary focus on Westchester County, NY area)

## Core Features & Functionality

### 1. Dashboard & Analytics
- **Real-time Metrics**: Total quotes, sent quotes, approved quotes, total value
- **Recent Activity**: Quick view of recent quotes with status indicators
- **System Status**: Operational status of key services (webhook, property analysis, quote generation)
- **Quick Actions**: Direct access to property analysis, quote management, and settings
- **Webhook Simulation**: Test quote generation from voice call data

### 2. Quote Management System

#### Quote Creation & Editing
- **Customer Information**: Name, email, phone, service address
- **Service Details**: Timeline preferences, color preferences, call summary
- **Package Selection**: Three-tier system (Essential, Complete, Premium)
- **Visual Mockup Generation**: AI-generated property visualization with lighting plans
- **Property Analysis Integration**: Automatic integration of roofline measurements and complexity

#### Quote Status Workflow
1. **Draft**: Initial creation, can be edited
2. **Generated**: Auto-generated from webhook data
3. **Sent**: Delivered to customer
4. **Viewed**: Customer has opened the quote
5. **Approved**: Customer has accepted the quote
6. **Rejected**: Customer has declined the quote

#### Three-Tier Package System

**Essential Package**
- Basic roofline lighting
- Standard installation
- Warm white LEDs
- Entry-level pricing

**Complete Package** (Recommended)
- Premium roofline lighting
- Wreaths (typically 3)
- Garland (25ft standard)
- Enhanced installation
- Mid-tier pricing

**Premium Package**
- Multicolor roofline lighting
- Maximum wreaths (5+)
- Extended garland (45ft+)
- Stake lights
- Premium installation
- Highest pricing tier

### 3. Property Analysis System

#### AI-Powered Analysis Features
- **Address Input**: Property address analysis
- **Satellite Integration**: Property visualization and measurement
- **Automated Measurements**: 
  - Roofline linear footage
  - Roof peak counting
  - Driveway length assessment
- **Property Classification**:
  - House style (colonial, ranch, contemporary, cape cod, modern)
  - Property size (small, medium, large)
  - Complexity level (simple, moderate, complex)
- **Service Recommendations**: Automated service suggestions based on property characteristics

#### Property Data Structure
```javascript
{
  roofline_linear_feet: 180,
  roof_peaks_count: 3,
  house_style: "colonial",
  driveway_length_feet: 75,
  front_entrance_area: true,
  architectural_features: ["dormers", "bay_windows", "front_porch"],
  complexity_level: "moderate",
  property_size: "large",
  accessibility_notes: "Steep roof angle may require additional safety equipment",
  recommended_services: ["roofline", "wreaths", "garland", "stake_lighting"]
}
```

### 4. Visual Mockup System

#### Automated Mockup Generation
- **Property-Based Visualization**: House style and roofline integration
- **Lighting Configuration Display**: Visual representation of selected package
- **Service Breakdown**: Individual service component visualization
- **Installation Planning**: Time estimates and power requirements
- **Customer Presentation**: Professional mockup for client presentations

#### Mockup Components
- Roofline lighting visualization (warm white/multicolor)
- Wreath placement indicators
- Garland length and placement
- Stake light positioning
- Installation complexity indicators

### 5. Settings & Configuration

#### Pricing Management
**Lighting Services**
- Roofline Standard: $12.50/linear foot
- Roofline Premium: $17.50/linear foot
- Wreaths Standard: $85.00 each
- Wreaths Premium: $125.00 each
- Garland: $8.75/linear foot
- Stake Lights: $25.00 each

**Installation Services**
- Installation Base: $275.00
- Installation Enhanced: $358.00
- Installation Premium: $440.00
- Markup: 15%
- Tax Rate: 8%

#### Email Templates
- **Quote Subject Line**: "Your Holiday Lighting Quote from Yule Love Lights"
- **Quote Greeting**: Customizable welcome message
- **Quote Footer**: Customizable closing message

#### Business Information
- **Company Name**: "Yule Love Lights" (default)
- **Contact Information**: Phone, email, business address
- **Service Area**: Configurable service territories

### 6. System Integration

#### Webhook Integration
- **Voice Call Processing**: Automated quote generation from call transcripts
- **Customer Data Extraction**: Automatic parsing of customer information
- **Service Request Processing**: AI interpretation of customer requirements
- **Quote Auto-Generation**: Seamless conversion from call data to quote

#### Webhook Data Structure
```javascript
{
  customer_name: "Demo Customer",
  customer_email: "demo@example.com", 
  customer_phone: "555-DEMO-123",
  service_address: "123 Demo Street, Demo City, NY 12345",
  services_requested: ["roofline", "wreaths", "garland"],
  timeline: "before December 15th",
  color_preference: "warm white",
  call_summary: "wants full lighting package for colonial house"
}
```

## Technical Architecture

### Frontend Stack
- **Framework**: React 18.2.0 with Vite 6.3.5
- **Styling**: Tailwind CSS 3.3.3 with custom design system
- **Animations**: Framer Motion 10.16.4
- **Icons**: Lucide React 0.299.0 (via ApperIcon component)
- **Routing**: React Router DOM 6.15.0
- **Notifications**: React Toastify 11.0.5
- **Date Handling**: date-fns 4.1.0

### Design System

#### Color Palette
**Primary** (Green - Holiday Theme)
- 50: #f0f9f4 to 900: #072318
- Main: #0f4c2f

**Secondary** (Red - Holiday Theme)  
- 50: #fef2f2 to 900: #4d0000
- Main: #8b0000

**Accent** (Gold - Holiday Theme)
- 50: #fffbeb to 900: #998400
- Main: #ffd700

#### Typography
- **Display Font**: Plus Jakarta Sans
- **Body Font**: Inter
- **Base Size**: 14px with responsive scaling

#### Component Patterns
- **Cards**: Gradient backgrounds with hover effects
- **Status Pills**: Color-coded status indicators
- **Buttons**: Primary, outline, and ghost variants
- **Forms**: Consistent field styling with validation states
- **Loading States**: Shimmer animations
- **Toast Notifications**: Gradient backgrounds matching status types

### Backend Architecture

#### Service Layer Pattern
All data operations handled through service layer:
- `src/services/api/quotesService.js`
- `src/services/api/propertyService.js`
- `src/services/api/settingsService.js`

#### Data Management
**Mock Data Structure** (Production would connect to real APIs)
- `src/services/mockData/quotes.json`
- `src/services/mockData/propertyAnalyses.json` 
- `src/services/mockData/settings.json`

#### CRUD Operations
Each service implements:
- `getAll()`: Retrieve all records
- `getById(id)`: Retrieve single record
- `create(item)`: Create new record
- `update(id, data)`: Update existing record  
- `delete(id)`: Remove record

### State Management
- **React Hooks**: useState, useEffect for local state
- **Custom Hooks**: 
  - `useQuotes()`: Quote management and operations
  - `usePropertyAnalysis()`: Property analysis operations
- **Context**: Minimal global state, primarily component-level state management

### Key Components Architecture

#### Layout Structure
```
Layout
├── Sidebar (Navigation)
├── Header (Search, Actions)
└── Main Content Area
    ├── Dashboard
    ├── QuotesList  
    ├── QuoteEditor
    ├── PropertyAnalysis
    ├── Settings
    └── SystemStatus
```

#### Reusable Components
**Atoms**: Button, Card, Input, Label, Badge
**Molecules**: FormField, MetricCard, StatusPill, SearchBar, NavItem
**Organisms**: Header, Sidebar, QuoteTable, QuotePackages, PropertyMap

## AI Integration Points

### 1. Property Analysis AI
- **Input**: Property address
- **Process**: Satellite image analysis, roofline detection, feature recognition
- **Output**: Detailed property measurements and service recommendations

### 2. Quote Generation AI
- **Input**: Webhook data from voice calls
- **Process**: Customer requirement interpretation, service matching, pricing calculation  
- **Output**: Complete quote with property analysis and package recommendations

### 3. Visual Mockup AI
- **Input**: Property characteristics + selected package
- **Process**: Lighting design generation, installation planning
- **Output**: Visual representation with installation details

## Data Models

### Quote Model
```javascript
{
  Id: 1,
  customer_name: "John Smith",
  customer_email: "john@email.com",
  customer_phone: "555-123-4567", 
  service_address: "123 Main St, Scarsdale, NY 10583",
  services_requested: ["roofline", "wreaths", "garland"],
  timeline: "before December 15th",
  color_preference: "warm white",
  call_summary: "wants full lighting package for colonial house",
  status: "sent", // draft, generated, sent, viewed, approved, rejected
  total_value: 2850,
  created_at: "2024-01-15T10:30:00Z",
  sent_at: "2024-01-15T14:20:00Z",
  property_analysis: { /* Property data */ },
  packages: [ /* Package options */ ]
}
```

### Property Analysis Model
```javascript  
{
  Id: 1,
  address: "123 Main St, Scarsdale, NY 10583",
  coordinates: { lat: 40.9565, lng: -73.7849 },
  satellite_image_url: "https://example.com/satellite/123main.jpg",
  roofline_linear_feet: 180,
  roof_peaks_count: 3,
  house_style: "colonial", // colonial, ranch, contemporary, cape_cod, modern
  driveway_length_feet: 75,
  front_entrance_area: true,
  architectural_features: ["dormers", "bay_windows", "front_porch"],
  complexity_level: "moderate", // simple, moderate, complex
  property_size: "large", // small, medium, large
  accessibility_notes: "Steep roof angle may require additional safety equipment",
  recommended_services: ["roofline", "wreaths", "garland", "stake_lighting"],
  analysis_timestamp: "2024-01-15T10:00:00Z"
}
```

### Package Model
```javascript
{
  tier: "complete", // essential, complete, premium  
  total: 2850,
  services: [
    "Premium roofline lighting (180 ft)",
    "3 premium wreaths", 
    "25ft garland",
    "Enhanced installation"
  ],
  recommended: true // Only one package marked as recommended
}
```

## User Workflows

### 1. New Quote Creation Workflow
1. **Dashboard** → Click "New Quote" 
2. **Quote Editor** → Enter customer information
3. **Property Analysis** → Analyze service address
4. **Package Selection** → Choose from 3 tiers
5. **Visual Mockup** → Generate property visualization
6. **Review & Send** → Final review and customer delivery

### 2. Webhook Quote Generation Workflow  
1. **Voice Call** → Customer calls business
2. **Webhook Processing** → Call data sent to system
3. **AI Analysis** → Customer requirements extracted
4. **Property Analysis** → Automatic address analysis
5. **Quote Generation** → Complete quote created
6. **Review** → Manual review and adjustment if needed
7. **Send to Customer** → Quote delivery

### 3. Property Analysis Workflow
1. **Address Input** → Enter property address
2. **AI Processing** → Satellite analysis and measurements
3. **Results Display** → Property characteristics and recommendations  
4. **Quote Integration** → Analysis data available for quote creation

## Business Logic

### Pricing Calculations
- **Base Service Cost**: Service type × quantity (linear feet, count)
- **Installation Cost**: Based on complexity level and package tier
- **Markup Application**: Configurable markup percentage
- **Tax Calculation**: Configurable tax rate
- **Package Bundling**: Tier-based pricing with recommended options

### Status Management
- **Automatic Progression**: Draft → Generated → Sent → Viewed → Approved/Rejected
- **Timestamp Tracking**: Creation, modification, sending, viewing dates
- **Notification System**: Toast notifications for all state changes

### Service Recommendations  
- **Property-Based**: Recommendations based on house style and size
- **Complexity-Based**: Service suggestions based on installation difficulty
- **Historical Data**: Pattern recognition from previous similar properties

## System Monitoring

### Service Health Checks
- **Voice Webhook**: Operational/Limited/Down
- **Property Analysis**: API connectivity and response times
- **Quote Generation**: Processing capacity and success rates  
- **Email Service**: Delivery status and bounce rates

### Performance Metrics
- **Quote Conversion Rates**: Generated → Sent → Approved percentages
- **Response Times**: Property analysis and quote generation speeds
- **Customer Engagement**: Quote view rates and interaction tracking

## Implementation Notes

### Development Priorities
1. **Core Quote Management**: Foundation functionality
2. **Property Analysis Integration**: AI-powered measurements  
3. **Visual Mockup System**: Customer presentation tools
4. **Webhook Processing**: Automated quote generation
5. **Advanced Analytics**: Performance tracking and optimization

### Scalability Considerations
- **Service-Based Architecture**: Easy API integration replacement
- **Component Modularity**: Reusable UI components
- **Data Structure Flexibility**: Extensible models for new features
- **Configuration Management**: Environment-based settings

### Security & Compliance
- **Customer Data Protection**: Secure handling of personal information  
- **Payment Integration Ready**: Structure supports payment processing addition
- **Audit Trail**: Comprehensive logging of quote changes and status updates
- **Access Control**: Foundation for role-based permissions

This documentation serves as the complete application prompt and technical specification for Quote Genie Pro, capturing all current functionality and providing the foundation for future development.