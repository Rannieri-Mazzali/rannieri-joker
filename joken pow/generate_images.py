from PIL import Image, ImageDraw, ImageFont
import os
os.makedirs(r'c:\foreach\joken pow\images', exist_ok=True)
for name,color in [('rock','red'),('paper','green'),('scissors','blue')]:
    img=Image.new('RGB',(120,120),color=color)
    d=ImageDraw.Draw(img)
    try:
        font=ImageFont.load_default()
        d.text((10,50),name,fill='white',font=font)
    except Exception:
        pass
    img.save(f'c:/foreach/joken pow/images/{name}.png')
print('placeholder images created')
