<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Cron extends CI_Controller {

	function __construct()
	{
		parent::__construct();
		$this->load->helper('json');
		$this->load->model("product_mdl");
		$this->load->model("value_mdl");
    }

    public function fetch_fund_value_data()
	{
		$this->load->helper("fetch_fund_value_data");
	    $values = fetch_sina_fund_value_data();
		if ($values === FALSE || count($values) == 0)
			return;

		$this->product_mdl->redundant_product_to_values($values);
		$this->value_mdl->update_values(&$values);
		
		//$this->output->set_output(json_encode($values));
	}
	
}

/* End of file cron.php */
/* Location: ./application/controllers/cron.php */