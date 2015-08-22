<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('fetch_data_by_url'))
{
	function fetch_data_by_url($url) 
	{
		$f = new SaeFetchurl();
		$ret = $f->fetch($url);
		if ($ret === false)
			return FALSE;
		return $ret;
	}
}

if ( ! function_exists('fetch_sina_fund_value_data'))
{
    function fetch_sina_fund_value_data()
	{
	    //$CI =& get_instance();
		//$CI->load->helper("charset_convert");

		$url = "http://finance.sina.com.cn/fund/newnav/of_netvalue_source_js.js";
		$data = fetch_data_by_url($url);

		$firstQuote = strpos($data, "\"");
		$lastQuote = strrpos($data, "\"");
		if (($firstQuote < 0) || ($lastQuote < 0) || ($lastQuote <= $firstQuote))
			return FALSE;

		$data = substr($data, $firstQuote + 1, $lastQuote - $firstQuote - 1);
		$items = explode(";", $data);

		$arr = array();;
		foreach ($items as $item) 
		{
			$values = explode(",", $item);
			if (count($values) > 6) 
			{ 
				$theDate = date("Y-m-d H:i:s", strtotime($values[6]));
				$netValue = (float)$values[2];
				$accumulation = (float)$values[3];
				$lastValue = (float)$values[4];
				
				if ($theDate != null) 
				{
					array_push($arr, Array("ProductId"=>$values[0], 
								"ProductName"=>$values[0], 
								"TheDate"=>$theDate,
								"Value"=>$netValue, 
								"LastValue"=>$lastValue, 
								"Accumulation"=>$accumulation, 
								"Dividend"=>0,
								"CompanyId"=>-1));
				}
			}
		}
		return $arr;
	}
}

?>
