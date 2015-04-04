<?

use \Michelf\MarkdownExtra;

class cms {

  public static $path;


  public static function url($url) {    
    $pathinfo = pathinfo($_SERVER['SCRIPT_NAME']);
    $dir = substr($pathinfo['dirname'], 1);
    return ($dir ? '/' : '') . $dir. '/' . $url;
  }

  public static function readMeta($filename) {
    $raw = file_get_contents($filename);

    preg_match("/\{.*\}/misU", $raw, $matches);

    if(isset($matches[0])) {
      $meta = json_decode($matches[0], true);
    } else $meta = array();

    $meta['path'] = $filename;
    return $meta;

  }

  public static function body($path) {
    $temp = file_get_contents($path);  
    $result = trim(substr($temp, strpos($temp, '}') + 1));

    return $result;
  }

  public static function markdown($raw) {
   return MarkdownExtra::defaultTransform($raw);
  }

  public static function compose($path) {
    ob_start();
      eval("?>".self::body($path));    
    $temp = ob_get_clean();

    // self::$path = $path;

    $temp = self::bb($temp);
    $temp = self::markdown($temp);

    return $temp;
  }

  public static function bb($text) {
    $text = preg_replace('/\[c\](.*?)\[\/c\]/', '**\\1**', $text);
    $text = str_replace('{{path}}', self::$path, $text);
    $text = str_replace('{{dir}}', self::url("files/" . self::$path), $text);
    $text = str_replace('url:', self::url(''), $text);

    $text = preg_replace_callback('/\[run\](.*)\[\/run\]/Uims', function($matches) {      
      $code = cms::sanitizeCode($matches[1]);
      $result = "
```javascript$code```\n";
      $result .= cms::sandbox(cms::sanitizeScript($matches[1]));
      return "<div class='editable'></div> $result";
    }, $text);


        $text = preg_replace_callback("/run\n```javascript(.*)```/Uims", function($matches) {      
      $code = cms::sanitizeCode($matches[1]);
      $result = cms::sandbox(cms::sanitizeScript($matches[1]));
      $result .= "
```javascript$code```\n";
      return "<div class='editable'></div> $result";
    }, $text);

                $text = preg_replace_callback("/silent\n```javascript(.*)```/Uims", function($matches) {      
      $code = cms::sanitizeCode($matches[1]);
      $result = "";
      $result .= cms::sandbox(cms::sanitizeScript($matches[1]));
      return "$result";
    }, $text);


    $text = preg_replace_callback('/\[import\](.*?)\[\/import\]/U', function($matches) {
      return cms::compose('documents/'.$matches[1]);
    }, $text);

return $text;


    return preg_replace_callback('/\[(.*?)\](.*?)\[\/.*?\]/misU', function($matches) {

      $tag = $matches[1];
      $content = $matches[2];
      echo $tag;

      if(intval($tag)) {
        return "<span class=\"color-{$tag}\">{$content}</span>";
      } else switch($tag) {
        case "run":
          return $content;
        break;
        default: return $tag; break;
      }

    }, $text);
  
  }


  public static function one($query = array()) {
    return array_pop(self::all($query));
  }

  public static function all($query = array()) {

    $documents = array_merge(array(), cache::getDocuments());

    if(isset($query['tag'])) {
      $tag = $query['tag'];

      $documents = array_filter($documents, function($meta) use ($tag) {

        if(!isset($meta['tags'])) return false;

        return array_search($tag, $meta['tags']) !== false;

      });
    }

    if(isset($query['ext'])) {

      $ext = $query['ext'];

      foreach ($documents as $key => $val) {
        if(substr($key, -strlen($ext)) !== $ext) unset($documents[$key]);        
      }
    }

    return $documents;
  }

  public static function examples ($tag) {
    $examples = self::all(array('tag' => $tag, 'ext' => 'js'));

    $result = "<h1>Examples</h1>\n";

    foreach($examples as $path => $document) {
      $body = self::body($path);
      $document['body'] = $body;
      $result .= self::template('example', $document);
    }

    return $result;
  }

  public static function template ($name, $data) {
    extract($data);
    ob_start();
    include("templates/{$name}.php");
    return ob_get_clean();    
  }

  public static function sanitizeCode($body) {
    //return htmlspecialchars($body);
    return preg_replace('/\/\* ignore \*\/.*\*\//Uims', '', $body);
  }

  public static function sanitizeScript($body) {    

    return str_replace('document.body', 'exampleContainer', $body);      
  }

  public static function sandbox ($script) {
    $id = uniqid();
    $result = "<div id=\"example-{$id}\" class=\"example-container\"></div>";
    $result .= '<script>';
    $result .= "var exampleContainer = document.querySelector(\"#example-{$id}\");";
    $result .= "(function(exampleContainer) {
    {$script}
    })(exampleContainer);</script>\n";

    return $result;
  }

  public static function silentSandbox ($script) {
    $id = uniqid();
    $result = "<div id=\"example-{$id}\" class=\"example-container\"></div>";
    $result .= '<script>';
    $result .= "var exampleContainer = document.querySelector(\"#example-{$id}\");";
    $result .= "(function(exampleContainer) {
    {$script}
    })(exampleContainer);</script>\n";

    return $result;
  }

  public static function aorb ($a, $b) {
    if(!isset($a)) return $b;
    return $a;
  }

  public static function runExample($raw) {
    $code = cms::sanitizeCode($raw);
    $script = cms::sanitizeScript($raw);
    $result = cms::sandbox($script);
    $result .= "```
$code
```";

    return $result;
  }

}