#!/usr/bin/env python3
"""
Setup script for Future Kicks website
Creates placeholder sneaker images with instructions
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_placeholder_image(filename, title, subtitle):
    """Create a placeholder image for sneakers"""
    # Create a dark background
    width, height = 800, 600
    img = Image.new('RGB', (width, height), color='#0a0a0a')
    draw = ImageDraw.Draw(img)
    
    # Draw a border
    border_width = 3
    draw.rectangle(
        [(border_width, border_width), (width-border_width, height-border_width)],
        outline='#00ff41',
        width=border_width
    )
    
    # Add text
    try:
        # Try to use a nice font
        title_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 60)
        subtitle_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 30)
    except:
        # Fallback to default font
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
    
    # Calculate text position for centering
    title_bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = title_bbox[2] - title_bbox[0]
    title_x = (width - title_width) // 2
    
    subtitle_bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
    subtitle_x = (width - subtitle_width) // 2
    
    # Draw text with glow effect
    glow_color = '#003d1a'
    for offset in range(5, 0, -1):
        draw.text((title_x+offset, height//2-50+offset), title, fill=glow_color, font=title_font)
        draw.text((title_x-offset, height//2-50-offset), title, fill=glow_color, font=title_font)
    
    # Draw main text
    draw.text((title_x, height//2-50), title, fill='#00ff41', font=title_font)
    draw.text((subtitle_x, height//2+50), subtitle, fill='#39ff14', font=subtitle_font)
    
    # Draw instruction text
    instruction = "Replace with actual sneaker image"
    try:
        inst_font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
    except:
        inst_font = ImageFont.load_default()
    
    inst_bbox = draw.textbbox((0, 0), instruction, font=inst_font)
    inst_width = inst_bbox[2] - inst_bbox[0]
    inst_x = (width - inst_width) // 2
    
    draw.text((inst_x, height-100), instruction, fill='#00ff9f', font=inst_font)
    
    # Save image
    img.save(filename)
    print(f"✅ Created: {filename}")

def main():
    print("🚀 Setting up Future Kicks website...")
    print("=" * 50)
    
    # Create placeholder images
    sneakers = [
        ("sneaker1.jpg", "SNEAKER 1", "Air Jordan 4 - Mushroom"),
        ("sneaker2.jpg", "SNEAKER 2", "Air Jordan 4 - Union"),
        ("sneaker3.jpg", "SNEAKER 3", "Air Jordan 1 - Mocha")
    ]
    
    for filename, title, subtitle in sneakers:
        filepath = os.path.join(os.path.dirname(__file__), filename)
        create_placeholder_image(filepath, title, subtitle)
    
    print("=" * 50)
    print("✅ Setup complete!")
    print("\n📝 Next steps:")
    print("1. Replace the placeholder images with your actual sneaker photos")
    print("2. Open index.html in your browser")
    print("3. Enjoy your futuristic sneaker website!")
    print("\n🌐 To start a local server:")
    print("   python3 -m http.server 8000")
    print("   Then visit: http://localhost:8000")

if __name__ == "__main__":
    main()
