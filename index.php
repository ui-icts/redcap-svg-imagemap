<?php
/** @var \UIOWA\SvgMap\SvgMap $module */

$docId = $module->getProjectSetting('svg-file')[$_GET['svg_id']];
$filename = db_query('select stored_name from redcap_edocs_metadata where doc_id = ' . $docId);
$svgUrl = EDOC_PATH . db_fetch_assoc($filename)['stored_name'];

$docInfo = \Files::getEdocContentsAttributes($docId);

echo $docInfo[2];