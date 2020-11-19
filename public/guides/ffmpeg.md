# Ffmpeg

> FFmpeg is the leading multimedia framework, able to decode, encode, transcode, mux, demux, stream, filter and play pretty much anything that humans and machines have created. You can view the source from [ffmpeg.org](ffmpeg.org)!

## Installation

To use FFmpeg lets first `download` and install ffmpeg on your PC.
[Click Here](https://http://ffmpeg.org/) to download FFmpeg.

## Verifying

To verify ffmpeg is installed open `powershell` or `command prompt` or any other `bash` and run -

```bash
$ ffmpeg -version
```

Finally You should see an output like this:<br/>
![Output](https://blogs.starstracker.xyz/img/ffmpeg-guide/verify.png)

**You have installed ffmpeg!**

# Basic Functions

In this guide I will show you some of the basic functions of FFmpeg.

## Image Media Conversions
Ffmpeg has lots of utilities , some of them are Image Conversions and Media Conversions! To read more about FFmpeg head out for their [website](https://http://ffmpeg.org/)!

## Converting Images 
> Lets suppose I have an `ico` file and want to change it to `png`
> ```bash
> ffmpeg -i my_file.ico my_file.png
> ```

## Converting Media
> Lets suppose I have a `mp3` file and want to change it to `wav`
> ```bash
> ffmpeg -i my_media.mp3 my_media.wav
> ```

# Audio Effects

We have learnt how to convert media 's , but In this guide I will telling how to add effects to Music file formats

## Adding Effects

To add effects you need to add a `-af` flag .

```bash
$ ffmpeg -i my_music.mp3 -af "bass=g=20" my_bassboosted_music.mp3
```

> The above example adds a 20 db bass to the `mp3` file

## Filters

You can choose from many filters from [here](https://ffmpeg.org/ffmpeg-filters.html)...

## Nightcoring a song

> To nightcore a song lets increase the frequency of the music
>
> ```bash
> $ ffmpeg -i music.mp3 -af "asetrate=48000*1.3,aresample=48000" nightcore.mp3
> ```

## Bassboosting a song

> Ffmpeg provides normalizer like loudnorm and others but I use the `dynaudnorm` to read more about `dynaudnorm` [click here](http://ffmpeg.org/ffmpeg-filters.html#dynaudnorm)
>
> ```bash
> $ ffmpeg -i music.mp3 -af "bass=g=10,dynaudnorm" bass.mp3
> ```

# Conclusion

Thats just a part of `Ffmpeg` ! There is still a lot more to discover about it!<br/>
Thank you for going thorugh this guide! 
