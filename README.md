# Jekyll Project README

This project uses [Jekyll](https://jekyllrb.com/), a static site generator for building simple, blog-aware websites.

## What is Jekyll?

Jekyll transforms plain text files written in Markdown or HTML into static websites and blogs. It is commonly used with GitHub Pages for easy deployment.

## How to Use

### 1. Install Jekyll

```bash
gem install jekyll bundler
```

### 2. Build and Serve the Site

```bash
bundle install
bundle exec jekyll serve
```

Visit `http://localhost:4000` to view your site.

### 3. Updating Printer/Mod Files

To update the printer/mod files on your website, use the `mod_update_script` provided in this repository. This script downloads and processes Markdown files (and their metadata) from remote sources and places them in the Jekyll site's `_printers` collection, ensuring proper front matter and structure for the website.

#### How to Use the Update Script

1. **Configure the Script**
   - Edit `mod_update_script/config.yaml` to list your projects. Each entry should include:
     - `title`: The display name for the printer/mod
     - `description`: A short description
     - `repository`: The URL to the remote Markdown file
     - `file_name`: The desired filename (must end with `.md`)

2. **Install Python Requirements**
   ```bash
   cd mod_update_script
   pip install -r requirements.txt
   ```

3. **Run the Script**
   ```bash
   python copy-printer-files.py
   ```
   This will download and update the Markdown files in the Jekyll site's `_printers/` directory, creating subfolders for each printer/mod as needed.

4. **Build the Jekyll Site**
   ```bash
   cd ../website
   bundle exec jekyll build
   ```

#### File Format
- The script automatically adds the required Jekyll front matter to each Markdown file:
  ```yaml
  ---
  layout: printer
  title: "Printer Name"
  description: "Short description"
  printer_id: "folder_name"
  permalink: "/printers/folder_name/"
  repository: "source_url"
  ---
  ```
- Place any additional static assets (images, etc.) in the appropriate subfolder under `_printers/` if needed.

## More Information

See the [Jekyll Documentation](https://jekyllrb.com/docs/) for advanced configuration and usage.