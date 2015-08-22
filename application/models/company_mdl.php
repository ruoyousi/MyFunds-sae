<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Company_mdl extends CI_Model
{

	private $table_name = 'fundcompany';
	
	function __construct()
	{
		parent::__construct();
		$ci =& get_instance();		
	}

	public function get_companies()
	{
		$query = $this->db->get($this->table_name);		
		return $query->result();
	}
	
}

/* End of file company_mdl.php */
/* Location: ./application/models/company_mdl.php */