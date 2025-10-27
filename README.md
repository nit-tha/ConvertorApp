# Multi Converter Tool 🔧

A comprehensive and user-friendly web-based utility suite designed for developers, testers, and data analysts. This all-in-one conversion toolkit provides essential data transformation and formatting capabilities in a clean, organized interface.

## 🌐 Live Demo
Access the app here: [Multi Converter Tool](https://nit-tha.github.io/ConvertorApp/)

## ✨ Latest Updates (v2.1.85)

### 🎨 **NEW: Image Processor**
- Image compression with quality control
- Format conversion (JPEG, PNG, WebP, JPG)
- Batch resizing with aspect ratio preservation
- Real-time size comparison and savings calculation
- Drag & drop file upload support

### 📊 **NEW: CSV/TSV Data Processor**
- Advanced CSV/TSV file parsing and validation
- Interactive data table with sorting and filtering
- Export to multiple formats (CSV, TSV, JSON, SQL)
- Duplicate row detection and removal
- Column manipulation (add/remove columns)
- Statistics and data insights

### 🔍 **Enhanced Duplicate Analysis**
- Smart duplicate detection with multiple output formats
- Statistical analysis (total, unique, duplicate counts)
- Export capabilities for processed data
- Support for large datasets

### 🕒 **Advanced Date/Epoch Tools**
- Comprehensive date generator with custom intervals
- Multi-format support (dd-MMM-yy, yyyy-mm-dd, etc.)
- Bulk date-to-epoch conversion
- Enhanced timezone handling with DST support

## 📂 Core Features

### 🕒 Time & Date Tools
- **Epoch Conversion**: Bidirectional epoch ↔ human-readable time conversion
- **Date Generator**: Generate date ranges with custom intervals
- **Timezone Support**: Multiple timezone conversions (UTC, IST, EST, SAST) with DST
- **Real-time Clock**: Live epoch timestamp display
- **Relative Time**: Calculate time differences in days/years
- **Bulk Processing**: Convert multiple dates simultaneously

### 📝 Text Processing Suite
- **Case Conversion**: UPPER, lower, Title, camelCase, snake_case, kebab-case
- **Text Manipulation**: Add/remove commas, quotes, reverse text
- **Character Analysis**: Word count, character count (with/without spaces)
- **Regex Tools**: Escape/unescape regex characters
- **Duplicate Detection**: Find and analyze duplicate entries in datasets

### 🎨 Visual & Media Tools
- **Color Converter**: HEX ↔ RGB ↔ HSL with visual preview
- **Image Processor**: Compression, resizing, format conversion
- **Color Picker**: Interactive color selection with copy functionality

### 🔐 Security & Encoding
- **Base64 Operations**: Encode/decode with error handling
- **Binary Converter**: Binary ↔ Decimal ↔ Hex ↔ Text conversion
- **JWT Decoder**: Parse and validate JWT tokens
- **Password Generator**: Secure password creation with customizable options
- **API Key Generator**: Cryptographically secure API key generation

### 📄 Document & Data Processing
- **Markdown Converter**: Natural Language → Markdown → HTML pipeline
- **JSON Tools**: Validate, format, and convert JSON data
- **CSV/TSV Processor**: Advanced spreadsheet data manipulation
- **XML Converter**: Convert XML to Block XML format with error detection

### 🌐 Web & API Utilities
- **Query String Tools**: Convert web queries ↔ JSON
- **URL Encoder/Decoder**: Handle URL encoding/decoding
- **Geocoding Tool**: Location search with coordinate lookup
- **GeoJSON Converter**: Transform coordinates to GeoJSON format

### 🧪 Testing & Development Tools
- **Test Case Builder**: Convert descriptive formats to structured test cases
- **Content Comparer**: Side-by-side text comparison with difference highlighting
- **Code Formatter**: Auto-format and beautify code (SQL, JSON, XML, JavaScript, etc.)
- **ID Generator**: Generate sequential database IDs with custom increments

### 🗺️ Geographic Tools
- **Location Geocoding**: Address → coordinates conversion
- **Map Integration**: OpenStreetMap visualization links
- **GeoJSON Export**: Create downloadable geographic data files
- **Coordinate Format Support**: Multiple coordinate input formats
## 🏗️ Architecture & Organization

### Navigation Structure
- **Query Formatter**: Text processing, epoch conversion, data counting
- **Conversion Suite**: Encoding, color tools, password generation, image processing
- **Block Conversion**: XML processing and validation  
- **JSON Conversion**: JSON utilities and web query tools
- **Content Comparer**: Text difference analysis
- **Code Refiner**: Code formatting and beautification
- **Case Master**: Test case building and Excel export
- **Geo Sight**: Geographic tools and coordinate conversion

### Tool Integration
- **One-Click Access**: All tools accessible via organized button interface
- **Context Switching**: Seamless switching between tools with active state indication
- **Clean UI**: Only one tool visible at a time for focused workflow
- **Responsive Design**: Optimized for desktop and mobile use

## 🚀 Getting Started

### Online Access
Simply visit [Multi Converter Tool](https://nit-tha.github.io/ConvertorApp/) - no installation required!

### Local Development
```bash
git clone https://github.com/nit-tha/ConvertorApp.git
cd ConvertorApp
python -m http.server 8000
# Open http://localhost:8000 in your browser
```

## 💡 Use Cases

### For Developers
- **API Testing**: JWT decoding, Base64 encoding, JSON validation
- **Data Conversion**: Format transformation for different systems
- **Code Formatting**: Beautify and organize code across multiple languages
- **Time Calculations**: Epoch conversions for timestamp handling

### For QA Testers
- **Test Case Management**: Convert descriptive test cases to structured formats
- **Data Comparison**: Side-by-side content analysis
- **Test Data Generation**: Create test datasets with date ranges and IDs
- **Format Validation**: Ensure data integrity across different formats

### For Data Analysts
- **CSV Processing**: Clean, analyze, and transform spreadsheet data
- **Duplicate Analysis**: Identify and remove duplicate entries
- **Geographic Data**: Convert addresses to coordinates for mapping
- **Format Conversion**: Transform data between JSON, CSV, XML formats

### 🧩 XML Tool
- Convert XML to Block XML format
- Intelligent error handling with line/column highlighting for malformed XML

### 🧪 Comparer
- Content difference viewer
- Side-by-side comparison for quick reviews

## 🛠️ Technologies Used
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Icons**: Font Awesome
- **Hosting**: GitHub Pages
- **APIs**: OpenStreetMap Nominatim (for geocoding)
- **Libraries**: JSZip, Mammoth.js (for document processing)

## 📄 License
This project is open-source.

## ✍️ Author
[Nitin Thakur](https://github.com/nit-tha)
