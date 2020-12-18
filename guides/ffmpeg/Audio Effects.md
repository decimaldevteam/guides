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
