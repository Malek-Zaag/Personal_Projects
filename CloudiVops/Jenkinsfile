pipeline{
    agent any
    parameters {
        choice(name: 'OSIMAGE', choices: ['linux', 'windows', 'windows_server'], description: 'Select OS image')
    }
    stages{
        stage("getting code") {
            steps {
                git url: 'https://github.com/Louaykharouf26/PFA', branch: 'malek',
                credentialsId: 'github-credentials' //jenkins-github-creds
                sh "ls -ltr"
            }
        }

        // stage("login") {
        //     steps{
        //         sh "az login"
        //     }
        // }

       stage("Setting up infra") {
            steps {                
                script {
                    echo "======== executing ========"
                        sh "pwd"
                        sh "ls"
                        if (params.OSIMAGE== 'linux') {
                            dir ("terraform-template/linux") {
                                sh "pwd"
                                sh "ls"
                                echo "terraform init"
                                sh "terraform init -upgrade"
                                sh "terraform apply --auto-approve --var-file=/var/jenkins_home/workspace/PFAPIPELINE/terraform-template/terraform.tfvars.json"
                                // badel esm el pipeline houni 
                                //sh "terraform apply --auto-approve --var-file='..\\..\\..\\..\\C:\\Users\\mk\\Desktop\\PFA\\terraform-template\\terraform.tfvars.json'"
                                //sh "../../../../"
                               // sh "terraform apply --auto-approve --var-file='C:\\Users/mk/Desktop/PFA/terraform-template/terraform.tfvars.json'"
                            }
                        } else if (params.OSIMAGE == 'windows'){
                            dir ("terraform-template/windows") {
                                sh "pwd"
                                sh "ls"
                                echo "terraform init"
                                sh "terraform init -upgrade"
                                //sh "terraform apply --auto-approve --var-file='C:\\Users/mk/Desktop/PFA/terraform-template/terraform.tfvars.json'"
                                //sh "terraform apply --auto-approve --var-file=../terraform.tfvars.json"
                                sh "terraform apply --auto-approve --var-file=/var/jenkins_home/workspace/PFAPIPELINE/terraform-template/terraform.tfvars.json"

                            }
                        } else {
                            dir ("terraform-template/windows_server") {
                                sh "pwd"
                                sh "ls"
                                echo "terraform init"
                                sh "terraform init -upgrade"
                                sh "terraform apply --auto-approve --var-file=/var/jenkins_home/workspace/PFAPIPELINE/terraform-template/terraform.tfvars.json"

                               // sh "terraform apply --auto-approve --var-file='C:\\Users/mk/Desktop/PFA/terraform-template/terraform.tfvars.json'"
                                //sh "terraform apply --auto-approve --var-file=../terraform.tfvars.json"
                            }                    
                        }
                    }            
                }
            post{
                success{
                    echo "======== Setting up infra executed successfully ========"
                }
                failure{
                    echo "======== Setting up infra execution failed ========"
                }
            }
        }        
    }
    post{
        success{
            echo "========pipeline executed successfully ========"
        }
        failure{
            echo "========pipeline execution failed========"
        }
    }
}
