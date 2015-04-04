<?

class cache {

  public static function crawlDocuments($path, $result = array()) {
    $items = scandir($path);

    foreach($items as $name) {
      
      if($name === "." || $name === "..") continue;

      $filename = $path . "/" . $name;

      if(is_dir($filename)) self::crawlDocuments($filename, $result);
      else {
        $result[$filename] = cms::readMeta($filename);
      }
    }

    file_put_contents("_cache/documents.cache", serialize($result));

    return $result;
  }

  private static $documents;

  public static function getDocuments() {
    if(!isset(self::$documents)) self::$documents = unserialize(file_get_contents("_cache/documents.cache"));

    return self::$documents;    
  }

}
