<?php
namespace UIOWA\SvgMap;

use ExternalModules\AbstractExternalModule;

class SvgMap extends AbstractExternalModule {
	public function redcap_data_entry_form() {
        $this->svgInit();
	}

    public function redcap_survey_page() {
        $this->svgInit();
    }

	public function svgInit() {
        $jsObject = array(
            'svgUrl' => $this->getUrl('index.php', true),
            'embedFields' => $this->getProjectSetting('svg-embed-field'),
            'choiceFields' => $this->getProjectSetting('svg-choice-field')
        );

        ?>
        <script>
            let UIOWA_SvgMap = <?= json_encode($jsObject) ?>;
        </script>
        <script src="<?= $this->getUrl('svgMap.js') ?>"></script>
        <style>
            .svg-map {
                width: inherit;
                height: 100%;
            }
        </style>
        <?php
    }
}