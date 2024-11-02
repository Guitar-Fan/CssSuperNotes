from PIL import Image, ImageDraw

# Create a new image with white background
width, height = 100, 100
image = Image.new('RGB', (width, height), 'white')
draw = ImageDraw.Draw(image)

# Draw Mario's hat
draw.rectangle([30, 10, 70, 30], fill='red')
draw.rectangle([40, 30, 60, 40], fill='red')

# Draw Mario's face
draw.rectangle([35, 40, 65, 70], fill='peachpuff')

# Draw Mario's eyes
draw.rectangle([40, 50, 45, 55], fill='black')
draw.rectangle([55, 50, 60, 55], fill='black')

# Draw Mario's mustache
draw.rectangle([45, 60, 55, 65], fill='black')

# Save the image
image.save('mario.png')