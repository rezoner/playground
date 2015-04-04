<!doctype html>
<html>
  <head>
      <title>Canvas Query</title>
      
      <meta charset="utf-8"> 
        
      <meta property="og:title" content="<?=$meta['title']?>"> 
      <meta property="og:image" content="http://canvasquery.com/<?=$meta['thumb']?>"> 
      <meta property="og:description" content="<?=$meta['description']?>">
      <meta name="description" content="<?=$meta['description']?>">

      <style>
        @import url(<?=cms::url('main.css')?>);
        @import url(<?=cms::url('mono-blue.min.css')?>);
        @import url(<?=cms::url('script/codemirror/codemirror.css')?>);
        @import url(<?=cms::url('script/codemirror/neo.css')?>);
        @import url(<?=cms::url('script/rainbow/themes/monokai.css')?>);
      </style>
       
      <script src="<?=cms::url('script/codemirror/codemirror.js')?>"></script>
      <script src="<?=cms::url('script/codemirror/javascript/javascript.js')?>"></script>

  </head>

  <body>
    
    <script src="<?=cms::url('script/basic.js')?>"></script>
    <script src="<?=cms::url('script/canvasquery.js')?>"></script>
    <script src="<?=cms::url('script/playground.js')?>"></script>

    <script>
    loadImages.path = "<?=cms::url('images/'); ?>";
    </script>
 
    <div id="content">    

      <?=$body?>

      <div id="bottom">

      <? include('templates/footer.php');?>

      </div>

    </div>

        <script src="<?=cms::url('script/rainbow/rainbow.min.js')?>"></script>
    <script src="<?=cms::url('script/rainbow/language/generic.js')?>"></script>
    <script src="<?=cms::url('script/rainbow/language/javascript.js')?>"></script>
    <script src="<?=cms::url('script/bottom.js')?>"></script>

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-9065813-10', 'auto');
      ga('send', 'pageview');
    </script>


  </body>
</html>