<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Dbtest extends CI_Controller {

	public function index()
	{
        $data = array(
        );

		$this->load->view('dbtest/result', $data);
	}
}

/* End of file home.php */
/* Location: ./application/controllers/dbtest.php */