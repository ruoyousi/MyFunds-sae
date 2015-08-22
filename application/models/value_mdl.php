<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Value_mdl extends CI_Model
{

	private $table_name = 'fundvalue';
	
	function __construct()
	{
		parent::__construct();
		$ci =& get_instance();
	}

	public function get_value($product_id)
	{
		$query = $this->db->order_by("TheDate", "desc")
					->where('ProductId', $product_id)
					->get($this->table_name, 1);
		if ($query->num_rows() > 0)
			return $query->row();
		else 
			return FALSE;
	}
	
	public function update_values($values) 
	{
		foreach ($values as $value) 
		{
		   $query = $this->db->where('ProductId', $value["ProductId"])
		           ->where('TheDate', $value["TheDate"])
					->get($this->table_name, 1);
           $this->compute_earning_rate($value);
		   if ($query->num_rows() > 0)
		       $this->db->where('ProductId', $value["ProductId"])
		           ->where('TheDate', $value["TheDate"])
				   ->update($this->table_name, $value);
		   else
			   $this->db->insert($this->table_name, $value);
		}
	}
	
	private function compute_earning_rate(&$value) 
	{
		if ($value["LastValue"] <= 0)
			$value["EarningRate"] = 0;
		else
		    $value["EarningRate"] = $this->compute_growth_rate($value["Value"], $value["LastValue"]);
	}
	
	private function compute_growth_rate($the_value, $last_value)
	{
		if ($last_value <= 0)
			return 0;
		else
		    return ceil(($the_value - $last_value) * 10000 / $last_value) / 100;
	}

}

/* End of file value_mdl.php */
/* Location: ./application/models/value_mdl.php */