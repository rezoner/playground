<!doctype html>
<html>
  <head>
      <title>Playground JS</title>
      
      <meta charset="utf-8"> 
        
      <meta property="og:title" content="Playground JS"> 
      <meta property="og:image" content="http://canvasquery.com/canvasquery.png"> 
      <meta property="og:description" content="Playground. Essential framework for javascript gamedevelopers.">
      <meta name="description" content="Playground. Essential framework for javascript gamedevelopers.">

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
    <script src="<?=cms::url('script/playground.js')?>"></script>
    <script src="<?=cms::url('script/inline-editor.js')?>"></script>

    <script>
    loadImages.path = "<?=cms::url('images/'); ?>";

    PLAYGROUND.Application.prototype.defaults.paths.base = '<?=cms::url('')?>';
    </script>


    <div id="sidebar">    

      <div id="social">
        <a class=github href="http://github.com/rezoner/playground/">github</a>
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

    

    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-9065813-20', 'auto');
      ga('send', 'pageview');

    </script>

  </body>
</html>
