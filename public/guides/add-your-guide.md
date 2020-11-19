# Add your guide

Add your guide to our guides website! This will take you some few minutes and the steps are below!

# Steps

## GitHub Login

Login to your github account, then view up the [decimaldevteam/guides](https://github.com/decimaldevteam/guides) where you need to make a pull request!

## Making your guide

Your guide needs to be written in markdown which gets converted later when user views it! So for that you need to go to [/public/guides/](https://github.com/decimaldevteam/guides/tree/main/public/guides) where you will find all guides now to create your guide you need to select a name for example lets assume that your guide name is `Some Guide` then your filename should be `some-guide.md` because it will be the path `guides.decimaldev.xyz/#/guide/some-guide` so it will be easy for users!

## Configuring your guide

Now you need to configure your guide by adding details of your guide in [/public/api.json](https://github.com/decimaldevteam/guides/blob/main/public/api.json) where you will see something like this

```json
[
    {
        "name": "Add your guide",
        "description": "Add your guide to our site!",
        "thumbnail": "thumbnail",
        "file": "add-your-guide",
        "updated": "19/11/2020 10:56 PM IST",
        "top": true,
        "tags": [
            "decimal",
            "official"
        ],
        "contributors": [
            "Scientific-Guy"
        ]
    },
    {
        ...
    },
]
```

This is the place where all details exists, you need to create a json object with the following objet structure!

- **name** - Name of the guide
- **description** - Description of the guide
- **thumbnail** - Thumbnail of the guide
- **contributors** - Array of github users
- **tags** - This will decide to what to display in recommended guides
- **file** - File name you selected like `some-guide.md` so just add `some-guide`!

Others are edited by the authors!

## Doing the pr

After doing your things, make a pull request which will be viewed and merged in few hours!

# Conditions

Some conditions while publishing the guides which might change

- Guide should not be so short!
- Content should be related only to programming or coding!
- A better english only guide
