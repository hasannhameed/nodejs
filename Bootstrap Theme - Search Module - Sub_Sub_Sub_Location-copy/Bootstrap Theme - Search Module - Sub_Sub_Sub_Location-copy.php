<?php
if (count($pars) == 1 && $pars[0] != $w['default_search_url'] && $pars[0] != '') {
    $list_services_model = new list_services();
    $sub_where = array(
    array('value' => $pars[0] , 'column' => 'filename', 'logic' => '='),
    array('value' => 0 , 'column' => 'master_id', 'logic' => '=')
    );
    $subCategory = $list_services_model->get($sub_where);
	
    if ($subCategory != false){
        $subCategory = (is_object($subCategory))?$subCategory:$subCategory[0];
        $_GET['tid']= $subCategory->service_id;
	} else { //added logic to handle the load of the sub-sub categories on select dropdowns
		$subSub_where = array(
    		array('value' => $pars[0] , 'column' => 'filename', 'logic' => '='),
    		array('value' => 0 , 'column' => 'master_id', 'logic' => '!=')
    	);
		$subSubCategory = $list_services_model->get($subSub_where);
		
		if ($subSubCategory != false){
			$subSubCategory = (is_object($subSubCategory))?$subSubCategory:$subSubCategory[0];
			$_GET['tid']= $subSubCategory->master_id;
			$_GET['ttid'] = $subSubCategory->service_id;
		}
	}
} else if (count($pars) > 1 && $pars[0] != $w['default_search_url'] && $pars[1] != '') { //added logic to handle the premade load of the categories when using /top/sub or sub-sub category structure
	$list_services_model = new list_services();
    $sub_where = array(
    array('value' => $pars[1] , 'column' => 'filename', 'logic' => '='),
    array('value' => 0 , 'column' => 'master_id', 'logic' => '=')
    );
    $subCategory = $list_services_model->get($sub_where);
	
    if ($subCategory != false){
        $subCategory = (is_object($subCategory))?$subCategory:$subCategory[0];
        $_GET['tid']= $subCategory->service_id;
	} else {
		$subSub_where = array(
    		array('value' => $pars[1] , 'column' => 'filename', 'logic' => '='),
    		array('value' => 0 , 'column' => 'master_id', 'logic' => '!=')
    	);
		$subSubCategory = $list_services_model->get($subSub_where);
		
		if ($subSubCategory != false){
			$subSubCategory = (is_object($subSubCategory))?$subSubCategory:$subSubCategory[0];
			$_GET['tid']= $subSubCategory->master_id;
			$_GET['ttid'] = $subSubCategory->service_id;
		}
	}
}
if ($_GET['location_value'] != "") { 
   $googleLocationValue = $_GET['location_value']; 

} else if ($w['geocode_visitor_default'] == 1 && $w['geocode'] == 1 && $_SESSION['vdisplay'] != "") { 
   $googleLocationValue = $_SESSION['vdisplay']; 
}
?>

<div class="module search_module">
   
    <form action="/<?php echo $w['default_search_url'];?>" class="website-search"  accept-charset="UTF-8" method="get">
        <div class="col-sm-3 col-xs-12 form-group">
       
            <select data-placeholder="%%%home_search_default_2%%%" name="tid" id="bd-chained" class="form-control">
                <option value="">%%%all_categories_label%%%</option>
                <?php 
                $list_profession_model = new list_professions();
                $topCategory = $list_profession_model->getByLimit(0,1);
                $topCategory = (is_object($topCategory))?$topCategory:$topCategory[0];
                $prof = $topCategory->profession_id;
                echo listServices($_GET['tid'],"list",$w,$prof,0,$w['fast_search']); ?>
            </select>
        </div>
        <div class="col-sm-3 col-xs-12 form-group">
           <!-- <label>%%%more_options_label%%%</label>  -->
            <select data-placeholder="%%%more_options_placeholder%%%" name="ttid" id="tid" class="form-control">
                <option value="">%%%all_categories_label%%%</option>
            </select>
        </div> 
        <div class="col-sm-3 col-xs-12 form-group">
          <!--  <label>%%%home_search_dropdown_3%%%</label> -->
            <input type="text" autocomplete="off" placeholder="%%%location_search_default%%%" class="googleSuggest googleLocation form-control" id="location_google_maps_sidebar" name="location_value" value="<?php echo $googleLocationValue;?>">
        </div>
        <div class="col-sm-3 col-xs-12 form-group nomargin">
            <button type="submit" class="btn btn-primary btn-block">%%%home_search_submit%%%</button> 
        </div>    
    </form>
</div>

