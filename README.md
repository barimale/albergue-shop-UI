#TODOs
card payment react component npm library

# Tips
## CSS nice border
```
              style={{
                borderStyle: 'solid',
                borderWidth: context === DeviceType.isDesktopOrLaptop ? '22px' : '16px',
                borderImageSource: `url('${process.env.PUBLIC_URL}/Frame205Colour2.svg')`,
                borderImageSlice: 100,
                borderImageRepeat: 'round stretch'
              }}
```
## How to deploy?
```
yarn build

firebase deploy
```

## How to generate sitemap.xml?
Execute:
```
yarn sitemap
```
If something does not work at all just ensure, if the environmental variable is in place:
```
NODE_PATH
```
and has value of:
```
./src
```
If not, open PS terminal and do as follows:
```
$env:NODE_PATH='./src'
```

# Development
To provide external translations, create a linkage between generated locales:
```
~/shop-albergue-oporto/locales/*
```
and:
```
/locales/externals/*.json
```
By executing bellowed command:
```
cd ./public/locales/
Mklink /d externals R:\locales
```
