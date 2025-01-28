# albergue-shop-UI
## Prereqs
```
- NodeJS 14.20.0
```
## Development
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
