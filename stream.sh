#! /bin/bash
#
# Diffusion youtube avec ffmpeg

# Configurer youtube avec une résolution 720p. La vidéo n'est pas scalée.

VBR="2500k"                                    # Bitrate de la vidéo en sortie
FPS="30"                                       # FPS de la vidéo en sortie
QUAL="medium"                                  # Preset de qualité FFMPEG
YOUTUBE_URL="rtmp://a.rtmp.youtube.com/live2"  # URL de base RTMP youtube
KEY=$1
FILE="input.mp4"

SOURCE="udp://239.255.139.0:1234"              # Source UDP (voir les annonces SAP)
KEY="...."                                     # Clé à récupérer sur l'event youtube
youtube-dl $2 -o input.mp4
ffmpeg -re -stream_loop -1 -i "input.mp4" -vcodec libx264 -preset veryfast -maxrate 500k -bufsize 2500k -vf "format=yuv420p" -g 60 -acodec libmp3lame -b:a 198k -ar 44100 -metadata title="" -metadata artist="" -metadata album_artist="" -metadata album="" -metadata date="" -metadata track="" -metadata genre="" -metadata publisher="" -metadata encoded_by="" -metadata copyright="" -metadata composer="" -metadata performer="" -metadata TIT1="" -metadata TIT3="" -metadata disc="" -metadata TKEY="" -metadata TBPM="" -metadata language="eng" -metadata encoder="" -f flv "rtmp://a.rtmp.youtube.com/live2/$KEY"


