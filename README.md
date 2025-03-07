# JusticeWatch Backend

This repository contains the backend API for the Justice Watch platform, which provides data on legislation, police violence incidents, and police department scorecards.

## Getting Started

### Prerequisites

- Git
- Miniconda or Anaconda

### Setup Instructions

#### 1. Install Miniconda (if not already installed)

**For MacOS/Linux:**

```bash
curl -O https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh
```

**For Windows:** Download and install from [Miniconda website](https://docs.conda.io/en/latest/miniconda.html)

#### 2. Create a New Conda Environment

```bash
# Create a new environment named "justicewatch"
conda create -n justicewatch python=3.11
```

#### 3. Activate the Environment

```bash
conda activate justicewatch
```

#### 4. Install Required Packages

```bash
# Make sure pip is installed in the environment
conda install pip

# Navigate to the backend directory (where requirements.txt is located)
cd path/to/justicewatch/backend

# Install required packages
pip install -r requirements.txt
```

#### 5. Run the Application

```bash
# Make sure you're in the backend directory
python mainAPI.py
```

The API will be available at http://localhost:8000

## Docker Deployment

To run the backend using Docker:

```bash
# Build the Docker image
docker build -t justicewatch-backend .

# Run the container
docker run -p 8000:8000 justicewatch-backend
```

## Adding New Dependencies

When adding new Python packages to the project, follow these steps to ensure proper dependency management:

1. **Always start with a fresh environment** to avoid including unnecessary packages. Use the instructions provided above to set up a new Conda environment.

2. **Install only the required packages** using pip:

   ```bash
   # Install new packages you need
   pip install new-package-name
   ```

3. **Update the requirements.txt file**:

   ```bash
   pip freeze > requirements.txt
   ```

4. **Test the application** with the updated requirements to ensure everything works correctly. (if you'd like to double/triple check, follow the above instructions to create a new environment and install the packages from the newly generated requirements.txt)
   ```

   ```
