<?php
//check if the website has bought the addon

if (empty($wa)) {
	$wa = getWebsiteLayout($w['website_id']);
}
$addonGoogleAssist = getAddOnInfo("google_search_assist", "e61611dad38a90b40f3519c14769ad3b");
if (isset($addonGoogleAssist['status']) && $addonGoogleAssist['status'] === 'success' && ($wa['google_search_assist'] == 1 || $wa['google_search_assist'] == '') && !isset($w['is_internal_api'])) {
    echo widget($addonGoogleAssist['widget'], "", $w[website_id], $w);
} else {
    ?>
    
    [widget=Bootstrap Theme - Member Results - No Results Code]
    
<?php } ?>