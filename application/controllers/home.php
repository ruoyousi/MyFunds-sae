<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Home extends CI_Controller {

    public function index()
	{
		$data = array();
        $this->load->view('home', $data);
	}
	
	public function bdapp()
	{
		$data = array();
        $this->load->view('bdapp', $data);
	}
	
	public function webqq()
	{
		$data = array();
        $this->load->view('webqq', $data);
	}
	
	public function wap()
	{
		$data = array();
        $this->load->view('wap', $data);
	}
	
}

/* End of file home.php */
/* Location: ./application/controllers/home.php */