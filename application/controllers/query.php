<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Query extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->helper('json');
        $this->load->model("company_mdl");
		$this->load->model("product_mdl");
		$this->load->model("value_mdl");
    }

	public function all_companies()
	{
		$this->output->set_output(json_encode($this->company_mdl->get_companies()));
	}

    public function products_of_company($company_id)
	{
		$this->output->set_output(json_encode($this->product_mdl->get_products($company_id)));
	}

	public function value_of_product($product_id)
	{
		$this->output->set_output(json_encode($this->value_mdl->get_value($product_id)));
	}
	
	public function values_of_products($product_ids)
	{
		$ids = explode("-", $product_ids);
		$values = array();
		foreach ($ids as $product_id) 
		{
			$value = $this->value_mdl->get_value($product_id);
			if ($value !== FALSE)
			{
				array_push($values, $value);
			}
		}
		$this->output->set_output(json_encode($values));
	}
	
}

/* End of file query.php */
/* Location: ./application/controllers/query.php */