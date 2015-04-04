{

}

# Paths

For now you can only redefine `base` path which is the directory where you want to put all of your assets.

Changing path at runtime:

```javascript
playground({
  
  paths: {
    base: "assets/"
  }
  
  /* ... */
});
```

Please end your paths with `/`.

Leave empty string if you want want to lookup within the same url as the index (which is default).