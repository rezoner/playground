{

}

# Playground - Data

Playground can load `text` or `json` data from another file.

```javascript
this.loadData("example");
```

This will look into `data/example.json`

JSON will get parsed and saved as an object - which you can easily access:

```javascript
this.data.example
```

run
```javascript
var app = playground({ 

  create: function() {

    /* this will look for data/example.json */

    this.loadData("example");

  },

  render: function() {

    this.layer.clear("#000").fillStyle("#fff").font("16px Arial");

    var data = this.data["example"];

    this.layer.fillText(JSON.stringify(data), 16, 32);
  
  },

  container: exampleContainer

});
```

<script>
exampleContainer.style.width = 800 + "px";
exampleContainer.style.height = 200 + "px";
</script>

