<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Product_mdl extends CI_Model
{

	private $table_name = 'fundproduct';
	
	function __construct()
	{
		parent::__construct();
		$ci =& get_instance();
	}
	
	public function get_all_products()
	{
		$query = $this->db->get($this->table_name);
		return $query->result();
	}

	public function get_products($company_id)
	{
		$query = $this->db->where('CompanyId', $company_id)
						->get($this->table_name);
		return $query->result();
	}
	
	public function redundant_product_to_values(&$values)
	{
		$products = $this->get_all_products();

		foreach ($values as &$value) 
		{
		   $product = $this->find_product($products, $value["ProductId"]);
		   if (FALSE !== $product) 
		   {
		      $value["ProductName"] = $product->ProductName;
		      $value["CompanyId"] = $product->CompanyId;
		   }
		}
	}
	
	private function find_product(&$products, $product_id)
	{
	    foreach ($products as $product) 
		{
		   if($product->ProductId == $product_id)
				return $product;
		}		
		return FALSE;
	}
	
}

/* End of file product_mdl.php */
/* Location: ./application/models/product_mdl.php */