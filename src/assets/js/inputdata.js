class MyInputData extends Polymer.Element {
        
      	static get is() { return 'my-inputdata'; }
            // Sets a notif message that pops up
            set_notif_error_message(message) {
                this.$.notif_toast_error.set("text", message)
                this.$.notif_toast_error.center();
                this.$.notif_toast_error.refit();
                this.$.notif_toast_error.open();
            }
            // Sets a notif message that pops up
            set_notif_normal_message(message) {
                this.$.notif_toast_normal.set("text", message)
                this.$.notif_toast_normal.center();
                this.$.notif_toast_normal.refit();
                this.$.notif_toast_normal.open();
            }

    		//runs when you hit the "submit" on the first page
    		load_data() {
    		    console.log(this.$.match_number.value);
    		    var team = this.$.team.value;
                //Fill form with default values:
                this.$.match_type.selected = "0";
                //this.$.match_number.value = "";
                this.$.methodScoring.selected = "0";
                this.$.methodAcquiring.selected = "0";
                this.$.climbMech.selected = "0";
                this.$.climb.selected="0";
                this.$.mobility.selected = "YES";
                this.$.autonSwitchCubes.selected = "0";
                this.$.autonScaleCubes.selected = "0";
                this.$.allianceSwitchCubes.selected = "0";
                this.$.opposingSwitchCubes.selected = "0";
                this.$.teleopScaleCubes.selected = "0";
                this.$.exchange.selected = "0";
                this.$.assistedOption.selected = "NONE";
                // Try to find data in server and fill in our form
                $.ajax({
                    url: "/getdata?match_number=" + this.$.match_number.value + "&team_number=" + this.$.team.value,
                    type: "GET",
                    success: (data) => { // We use Lambda (=>) instead of function() because it preserves "this"
                        if (data.length == 0) {
                            this.set_notif_normal_message("No data found! Starting new sheet");
                            return;
                        }

                        data = data[0]; // object is stored in array
                        if (data.mobility == "YES") {
                            this.$.mobility.selected = 0;
                        } else if (data.mobility == "NO") {
                            this.$.mobility.selected = 1;
                        }

                        if (data.climb == "YES") {
                            this.$.climb.selected = 0;
                        } else if (data.climb == "NO") {
                            this.$.climb.selected = 1;
                        }
                        if (data.match_type == "Practice") {
                            this.$.match_type.selected = 0;
                        } else if (data.match_type == "Qualifier") {
                            this.$.match_type.selected = 1;
                        } else if (data.match_type == "Quarterfinals") {
                            this.$.match_type.selected = 2;
                        } else if (data.match_type == "Semifinals") {
                            this.$.match_type.selected = 3;
                        } else if (data.match_type == "Finals") {
                            this.$.match_type.selected = 4;
                        }
                        
                        if (data.methodScoring == "Place") {
                            this.$.methodScoring.selected = 0;
                        } else if (data.methodScoring == "Shoot Cube") {
                            this.$.methodScoring.selected = 1;
                        } else {
                            this.$.methodScoring.selected = 2;
                            this.$.loadable_text0.style.display = "";
                            this.$.methodScoring.value = data.methodScoring;
                        }
                        
                        if (data.methodAcquiring == "Floor") {
                            this.$.methodAcquiring.selected = 0;
                        } else if (data.methodAcquiring == "Portal") {
                            this.$.methodAcquiring.selected = 1;
                        } else {
                            this.$.methodAcquiring.selected = 2;
                            this.$.loadable_text1.style.display = "";
                            this.$.methodAcquiring.value = data.methodAcquiring;
                        }

                        if (data.climbMech == "Rung") {
                            this.$.climbMech.selected = 0;
                        } else if (data.climbMech == "Ramp") {
                            this.$.climbMech.selected = 1;
                        } else if (data.climbMech == "Rung Expansion") {
                            this.$.climbMech.selected = 2;
                        } else {
                            this.$.climbMech.selected = 3;
                            this.$.loadable_text2.style.display = "";
                            this.$.climbMech.value = data.climbMech;
                        }

                        if (data.assistedOption == "NONE") {
                            this.$.assistedOption.selected = 0;
                        } else {
                            this.$.assistedOption.selected = data.assistedOption;
                        }

                        if (data.autonSwitchCubes >= 7) {
                            this.$.autonSwitchCubes.selected = 7;
                            this.$.autonSwitchCubes.value = data.autonSwitchCubes;
                        } else {
                            this.$.autonSwitchCubes.selected = this.$.autonSwitchCubes.value;
                        }

                        if (data.autonScaleCubes >= 7) {
                            this.$.autonScaleCubes.selected = 7;
                            this.$.autonScaleCubes7.value = data.autonScaleCubes;
                        } else {
                            this.$.autonScaleCubes.selected = this.$.autonScaleCubes.value;
                        }
                        
                        if (data.allianceSwitchCubes >= 7) {
                            this.$.allianceSwitchCubes.selected = 7;
                            this.$.allianceSwitchCubes7.value = data.allianceSwitcgCubes;
                        } else {
                            this.$.allianceSwitchCubes.selected = this.$.allianceSwitchCubes.value;
                        }

                        if (data.opposingSwitchCubes >= 7) {
                            this.$.opposingSwitchCubes.selected = 7;
                            this.$.opposingSwitchCubes7.value = data.opposingSwitchCubes;
                        } else {
                            this.$.opposingSwitchCubes.selected = this.$.opposingSwitchCubes.value;
                        }
                        
                        if (data.teleopScaleCubes >= 7) {
                            this.$.teleopScaleCubes.selected = 7;
                            this.$.teleopScaleCubes7.value = data.teleopScaleCubes;
                        } else {
                            this.$.teleopScaleCubes.selected = this.$.teleopScaleCubes.value;
                        }

                        if (data.exchange >= 7) {
                            this.$.exchange.selected = 7;
                            this.$.exchange7.value = data.exchange;
                        } else {
                            this.$.exchange.selected = this.$.exchange.value;
                        }

                    },
                    error: function(data) {
                        this.set_notif_error_message("ERROR: Did not load data, "
                            + "prior data might exist, and you will OVERWRITE it."
                            + "Be wary when uploading");
                    }
                });

                    this.$.loadable_sheet.style.display="block";
                    this.$.sheet_key_info.style.display="none";
                    //this.$.load_sheet_button.style.display="none";

                    this.$.loadable_sheet_team_number.innerHTML = "Team " + team;
            }
			close_data() {
			    this.$.loadable_sheet.style.display="none";
                this.$.team.value = "";
                this.$.match_type.value = "";
                this.$.match_type.selected = "0";
                this.$.match_number.value = "";
                this.$.methodScoring.selected = "0";
                this.$.methodScoringOther.value = "";
                this.$.methodAcquiring.selected = "0";
                this.$.methodAcquiringOther.value = "";
                this.$.climbMech.selected = "0";
                this.$.climbMech.value = "";
                this.$.climbMechOther.value = "";
                this.$.mobility.selected = "YES";
                this.$.autonSwitchCubes.selected = "0";
                this.$.autonSwitchCubes7.value = "";
                this.$.autonScaleCubes.selected = "0";
                this.$.autonScaleCubes7.value = "";
                this.$.allianceSwitchCubes.selected = "0";
                this.$.allianceSwitchCubes7.value = "";
                this.$.opposingSwitchCubes.selected = "0";
                this.$.opposingSwitchCubes7.value = "";
                this.$.teleopScaleCubes.selected = "0";
                this.$.teleopScaleCubes7.value = "";
                this.$.exchange.selected = "0";
                this.$.exchange7.value = "";
                this.$.assistedOption.selected = "NONE";
                this.$.loadable_text0.style.display = "none";
                this.$.loadable_text1.style.display = "none";
                this.$.loadable_text2.style.display = "none";
                this.$.loadable_text3.style.display = "none";
                this.$.loadable_text4.style.display = "none";
                this.$.loadable_text5.style.display = "none";
                this.$.loadable_text6.style.display = "none";
                this.$.loadable_text7.style.display = "none";
                this.$.loadable_text8.style.display = "none";
				this.$.sheet_key_info.style.display="block";
                //this.$.load_sheet_button.style.display="block";
			}
            load_text_method_scoring() {
                var name = this.$.method_scoring_button.id;
                if (name == "method_scoring_button") {
                    this.$.loadable_text0.style.display="block";
                    this.$.method_scoring_button.id="method_scoring_button1";
                }
                if (name == "method_scoring_button1") {
                    this.$.loadable_text0.style.display="none";
                    this.$.method_scoring_button.id="method_scoring_button";
                }
            }
            load_text_method_acquiring() {
                var name = this.$.method_acquiring_button.id;
                if (name == "method_acquiring_button") {
                    this.$.loadable_text1.style.display="block";
                    this.$.method_acquiring_button.id="method_acquiring_button1";
                }
                if (name == "method_acquiring_button1") {
                    this.$.loadable_text1.style.display="none";
                    this.$.method_acquiring_button.id="method_acquiring_button";
                }
            }
            load_text_climb_mech() {
                var name = this.$.climbing_mech_button.id;
                if (name == "climbing_mech_button") {
                    this.$.loadable_text2.style.display="block";
                    this.$.climbing_mech_button.id="climbing_mech_button1";
                }
                if (name == "climbing_mech_button1") {
                    this.$.loadable_text2.style.display="none";
                    this.$.climbing_mech_button.id="climbing_mech_button";
                }
            }
            load_text_switch_cubes() {
                var name = this.$.switch_button.id;
                if (name == "switch_button") {
                    this.$.loadable_text3.style.display="block";
                    this.$.switch_button.id="switch_button1";
                }
                if (name == "switch_button1") {
                    this.$.loadable_text3.style.display="none";
                    this.$.switch_button.id="switch_button";
                }
			}
			load_text_scale_cubes_auton() {
                var name = this.$.scale_button.id;
                if (name == "scale_button") {
                    this.$.loadable_text4.style.display="block";
                    this.$.scale_button.id="scale_button1";
                }
                if (name == "scale_button1") {
                    this.$.loadable_text4.style.display="none";
                    this.$.scale_button.id="scale_button";
                }
			}
			load_text_alliance_switch_cubes() {
                var name = this.$.alliance_switch_button.id;
                if (name == "alliance_switch_button") {
                    this.$.loadable_text5.style.display="block";
                    this.$.alliance_switch_button.id="alliance_switch_button1";
                }
                if (name == "alliance_switch_button1") {
                    this.$.loadable_text5.style.display="none";
                    this.$.alliance_switch_button.id="alliance_switch_button";
                }
			}
			load_text_opposing_switch_cubes() {
                var name = this.$.opposing_switch_button.id;
                if (name == "opposing_switch_button") {
                    this.$.loadable_text6.style.display="block";
                    this.$.opposing_switch_button.id="opposing_switch_button1";
                }
                if (name == "opposing_switch_button1") {
                    this.$.loadable_text6.style.display="none";
                    this.$.opposing_switch_button.id="opposing_switch_button";
                }
            }
            load_text_scale_cubes_teleop() {
                var name = this.$.teleop_button.id;
                if (name == "teleop_button") {
                    this.$.loadable_text7.style.display="block";
                    this.$.teleop_button.id="teleop_button1";
                }
                if (name == "teleop_button1") {
                    this.$.loadable_text7.style.display="none";
                    this.$.teleop_button.id="teleop_button";
                }
            }
			load_text_exchange_cubes() {
                var name = this.$.exchange_button.id;
                if (name == "exchange_button") {
                    this.$.loadable_text8.style.display="block";
                    this.$.exchange_button.id="exchange_button1";
                }
                if (name == "exchange_button1") {
                    this.$.loadable_text8.style.display="none";
                    this.$.exchange_button.id="exchange_button";
                }
			}
    		submit_data() {
      			//var form = $("#scout_form");
                //Changes selected numerical values to strings.
                //Mobility

                if (this.$.mobility.selected == 0) {
                    this.$.mobility.value = "YES"
                }
                else {this.$.mobility.value = "NO"}

                //Match Type
                if (this.$.match_type.selected == 0) {
                    this.$.match_type.value = "Practice"
                }
                if (this.$.match_type.selected == 1) {
                    this.$.match_type.value = "Qualifier"
                }
                if (this.$.match_type.selected == 2) {
                    this.$.match_type.value = "Quarterfinals"
                }
                if (this.$.match_type.selected == 3) {
                    this.$.match_type.value = "Semifinals"
                }
                if (this.$.match_type.selected == 4) {
                    this.$.match_type.value = "Finals"
                }

                //Method of Scoring
                if (this.$.methodScoring.selected == 0) {
                this.$.methodScoring.value = "Place"
                }
                if (this.$.methodScoring.selected == 1) {
                this.$.methodScoring.value = "Shoot Cube"
                }

                if (this.$.methodScoring.selected == 2) {
                this.$.methodScoring.value = this.$.methodScoringOther.value
                }

                //Method of Acquiring
                if (this.$.methodAcquiring.selected == 0) {
                this.$.methodAcquiring.value = "Floor"
                }
                if (this.$.methodAcquiring.selected == 1) {
                this.$.methodAcquiring.value = "Portal"
                }
                if (this.$.methodAcquiring.selected == 2) {
                this.$.methodAcquiring.value = this.$.methodAcquiringOther.value
                }


                //Climb Mechanism
                if (this.$.climbMech.selected == 0) {
                this.$.climbMech.value = "Rung"
                }
                if (this.$.climbMech.selected == 1) {
                this.$.climbMech.value = "Ramp"
                }
                if (this.$.climbMech.selected == 2) {
                this.$.climbMech.value = "Rung Expansion"
                }
                if (this.$.climbMech.selected == 3) {
                this.$.climbMech.value = this.$.climbMechOther.value
                }

                //climb:
                if (this.$.climb.selected == 0 ) {
                this.$.climb.value = "YES"
                }
                if (this.$.climb.selected == 1 ) {
                this.$.climb.value = "NO"
                }

                //assistedOption
                if (this.$.assistedOption.selected == 0) {
                this.$.assistedOption.value = "NONE"
                }
                if (this.$.assistedOption.selected == 1) {
                this.$.assistedOption.value = 1
                }
                if (this.$.assistedOption.selected == 2) {
                this.$.assistedOption.value = 2
                }

                //7 plus
                if (this.$.autonSwitchCubes.selected == 7) {
                    this.$.autonSwitchCubes.value = this.$.autonSwitchCubes7.value
                } else {
                    this.$.autonSwitchCubes.value = this.$.autonSwitchCubes.selected
                }

                if (this.$.autonScaleCubes.selected == 7) {
                    this.$.autonScaleCubes.value = this.$.autonScaleCubes7.value
                } else {
                    this.$.autonScaleCubes.value = this.$.autonScaleCubes.selected
                }

                if (this.$.allianceSwitchCubes.selected == 7) {
                    this.$.allianceSwitchCubes.value = this.$.allianceSwitchCubes7.value
                } else {
                    this.$.allianceSwitchCubes.value = this.$.allianceSwitchCubes.selected
                }

                if (this.$.opposingSwitchCubes.selected == 7){
                    this.$.opposingSwitchCubes.value = this.$.opposingSwitchCubes7.value
                } else {
                    this.$.opposingSwitchCubes.value = this.$.opposingSwitchCubes.selected
                }

                if (this.$.teleopScaleCubes.selected == 7) {
                    this.$.teleopScaleCubes.value = this.$.teleopScaleCubes7.value
                } else {
                    this.$.teleopScaleCubes.value = this.$.teleopScaleCubes.selected
                }

                if (this.$.exchange.selected == 7) {
                    this.$.exchange.value = this.$.exchange7.value
                } else {
                    this.$.exchange.value = this.$.exchange.selected
                }
                console.log("HERE");
                console.log(parseInt(this.$.match_number.value));
                // Set a variable, "info" to the data.
      			var info = {
                    team_number: parseInt(this.$.team.value),
                    match_type: this.$.match_type.value,
                    match_number: parseInt(this.$.match_number.value),
                    methodScoring: this.$.methodScoring.value,
                    methodAcquiring: this.$.methodAcquiring.value,
                    climbMech: this.$.climbMech.value,
                    mobility: this.$.mobility.value,
                    autonSwitchCubes: parseInt(this.$.autonSwitchCubes.value),
                    autonScaleCubes: parseInt(this.$.autonScaleCubes.value),
                    allianceSwitchCubes: parseInt(this.$.allianceSwitchCubes.value),
                    opposingSwitchCubes: parseInt(this.$.opposingSwitchCubes.value),
                    teleopScaleCubes: parseInt(this.$.teleopScaleCubes.value),
                    exchange: parseInt(this.$.exchange.value),
                    climb: this.$.climb.value,
                    assistedOption: this.$.assistedOption.value
      			};
      			console.log(this.$.mobility.selected);
                console.log("Match Type: " + this.$.match_type.value + ", Match Number: " + this.$.match_number.value);
      			//console.log(!this.$.yellow_card.checked);
	  				//console.log(this.$.comments.value);
	  				//console.log(this.$.successgr);
	  				//console.log(this.$.successgr.selected);
	  			console.log(info);
	  				/*console.log(this.$.team.value);
    				  console.log(form.serialize());*/
                var base = this;

      			$.ajax({
      			    url: "/scout",
      			    type: "post",
      			    data: info,//scout_form.serialize(),
      			    success: function(data) {
                    base.set_notif_normal_message("Successfully Updated!");
                    console.log("Result: " + data);
                    /*if (data.result === "success") {
      			            this.set_notif_normal_message("Successfully Updated!");
                    } else if (data.result === "invalid") {
      			            // TODO: Do we even need this?
                        this.set_notif_error_message("Invalid data! "
                        + "Make sure that all inputs are less than 255 and greater than 0");
      			        }*/
      			    },
      			    error: function() {
                        base.set_notif_error_message("Failed to update!"
                            + " Either your internet is bad, or your data is invalid! (counters must be 0 to 255 only) aka the back end is nonexistent)");
                        /*(base.set_notif_error_message("Invalid data! "
                        + "Make sure that all inputs are less than 255 and greater than 0");*/
                            /*$("#error_log").html("Failed to update. Try using QR (once we get that up and running)");
                            $("#success_log").html("");*/
      			    }
				});
    		}
    }
    window.customElements.define(MyInputData.is, MyInputData);
