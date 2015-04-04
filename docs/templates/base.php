<!doctype html>
<html>
  <head>
      <title>Playground JS</title>
      
      <meta charset="utf-8"> 
        
      <meta property="og:title" content="Playground JS"> 
      <meta property="og:image" content="http://canvasquery.com/canvasquery.png"> 
      <meta property="og:description" content="Canvas for gamedevelopers. Out of box - mouse, keyboard, scaling, loading images.">
      <meta name="description" content="Canvas for gamedevelopers. Out of box - mouse, keyboard, scaling, loading images.">

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
    <script src="<?=cms::url('script/inline-editor.js')?>"></script>

    <script>
    loadImages.path = "<?=cms::url('images/'); ?>";

    PLAYGROUND.Application.prototype.defaults.paths.base = '<?=cms::url('')?>';
    </script>


    <div id="sidebar">    

      <div id="social">
        <a class=github href="http://github.com/rezoner/CanvasQuery/">github</a>
        <a class=twitter href="https://twitter.com/rezoner">twitter</a>
        <a class=gratipay href="https://gratipay.com/rezoner/">gratipay</a>
      </div>

      <?=cms::compose("documents/toc.md")?>

    </div>
 
    <div id="content">    

      <div id="wip">This page is work-in-progress. You can reach me on <a href="http://twitter.com/rezoner">twitter</a> or mail to rezoner1337@gmail.com</div>
      <?=$body?>


    <div id="bottom">

      <? include('templates/footer.php');?>

    </div>

     
    </div>

 
    
    <script src="<?=cms::url('script/rainbow/rainbow.min.js')?>"></script>
    <script src="<?=cms::url('script/rainbow/language/generic.js')?>"></script>
    <script src="<?=cms::url('script/rainbow/language/javascript.js')?>"></script>
    <script src="<?=cms::url('script/bottom.js')?>"></script>

    


  </body>
</html>
