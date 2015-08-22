<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

if ( ! function_exists('unicode_encode'))
{
	function unicode_encode($str, $encoding='GBK', $prefix='&#', $postfix=';')
	{
		$str = iconv($encoding, 'UCS-2', $str);
		$arrstr = str_split($str, 2);
		$unistr = '';
		for($i=0, $len=count($arrstr); $i<$len; $i++)
		{
			$dec = hexdec(bin2hex($arrstr[$i]));
			$unistr .= $prefix.$dec.$postfix;
		}
		return $unistr;
	}
}

if ( ! function_exists('unicode_decode'))
{
	function unicode_decode($unistr, $encoding='GBK', $prefix='&#', $postfix=';')
	{
		$arruni = explode($prefix, $unistr);
		$unistr = '';
		for($i = 1, $len = count($arruni); $i<$len; $i++)
		{
			if(strlen($postfix) > 0) 
			{
				$arruni[$i] = substr($arruni[$i], 0, strlen($arruni[$i])-strlen($postfix)); 
			}
			$temp = intval($arruni[$i]);
			$unistr .= ($temp < 256) ? chr(0).chr($temp) : chr($temp/256).chr($temp%256);
		}
		return iconv('UCS-2', $encoding, $unistr);
	}
}
?>
