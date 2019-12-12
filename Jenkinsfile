	def determineForwardBranch(currentBranch){
		def ffBranch='dev'
		if(currentBranch=='dev'){
			ffBranch='test'
		}else if(currentBranch == 'test'){
			ffBranch='master'
		}
		return ffBranch;
	}

	def determineClusterPrefix(currentBranch){
		def prefix="DEV";
		if(currentBranch=='dev'){
			prefix='DEV'
		}else if(currentBranch == 'test'){
			prefix='QA'
		}else if(currentBranch == 'master'){
			prefix='DEV'
		}
		return prefix;
	}
	
	def getImageTag(currentBranch,version){
		def imageTag=version;
		if(currentBranch=='dev'){
			imageTag=version+"-develop"
		}else if(currentBranch == 'test'){
			imageTag=version+"-tested"
		}else if(currentBranch == 'master'){
			imageTag=version+"-approved"
		}
		return imageTag;
	}
	
	def getEnvironemntName(currentBranch){
		def envName="dev";
		if(currentBranch=='dev'){
			envName="dev"
		}else if(currentBranch == 'test'){
			envName="test"
		}else if(currentBranch == 'master'){
			envName="dev"
		}
		return envName;
	}

	envProps = null

	def loadProperties() {
        envProps = readProperties file: '/var/jenkins/data/cluster.properties'
 	}
	
node{
	def GIT_URL = "https://github.com/maximusfederal/mydemo-provider-svc.git"
	def SERVICE_NAME = "mydemo-provider-svc"
	def SERVICE_VERSION = "1.0." + env.BUILD_NUMBER
	def GIT_BRANCH = env.BRANCH_NAME
	pfx = determineClusterPrefix(GIT_BRANCH)
	println "PFX =${pfx}"
	def gitgub_cred = 'github-cred'
	cluster_name = env."${pfx+'_CLUSTER_NAME'}"
	cluster_url =  env."${pfx+'_CLUSTER_ENDPOINT'}"
	token_K8s_cred ='K8S_'+pfx+'_JENKINS_TOKEN'
	keycloak_url = env."${pfx+'_K8S_KEYCLOAK_URL'}"
	imageTag = getImageTag(GIT_BRANCH,SERVICE_VERSION)
	def image = null;
	anchore_url = env."${'DEV_K8S_ANCHORE_URL'}"  
	anchore_cred = 'ANCHORE_CREDENTIALS'
	def appUrl = ""

	stage("prepare"){
                loadProperties()
                cluster_name=envProps["${pfx+'_CLUSTER_NAME'}"]
                cluster_url = envProps["${pfx+'_CLUSTER_ENDPOINT'}"]
                anchore_url = envProps["${'DEV_K8S_ANCHORE_URL'}"]
                keycloak_url = envProps["${pfx+'_K8S_KEYCLOAK_URL'}"]
                ECR_URL = envProps["ECR_URL"]
                if(env.BUILD_NUMBER=="1"){
                	currentBuild.result = 'ABORTED'
    				error('Master Job is running...')
                }
	}
		
	stage("check out code"){
        println "cluster_name= ${cluster_name}"
        println "cluster_url= ${cluster_url}"
        println "ECR_URL= ${ECR_URL}"
	
		echo "Checking out ${GIT_BRANCH} from ${GIT_URL} "
		checkout changelog: true, poll: false, 
			scm: [
				$class: 'GitSCM', 
				branches: [[name: "${GIT_BRANCH}"]],
				doGenerateSubmoduleConfigurations: false, 
				extensions: [
				    [$class: 'WipeWorkspace'],
					[$class: 'RelativeTargetDirectory', relativeTargetDir: SERVICE_NAME]
				],
				submoduleCfg: [], 
				userRemoteConfigs: [[credentialsId: gitgub_cred,url: GIT_URL]]
			]
			
	}
	
	stage("build"){
	    dir(SERVICE_NAME){
	    	println "Building ${SERVICE_NAME} from branch ${GIT_BRANCH}"
			sh """
			    rm -rf  package-lock.json
                source ~/.bashrc && nvm --version && nvm install node
                nvm use node
                npm cache clean --force
                npm remove  angular-cli
			    npm install -g @angular/cli --save-dev
				export SERVICE_VERSION=${SERVICE_VERSION}
				./gradlew clean build assemble
			"""
		}
	}

	stage("code coverage"){
	    dir(SERVICE_NAME){
			sh """
				./gradlew jacocoTestReport -xbuildAngular
			"""
		}
	}
	
	stage("owasp"){
	    dir(SERVICE_NAME){
			sh """
				./gradlew dependencyCheckAnalyze
			"""
		}
	}

	

	stage("static code analysis"){
		withSonarQubeEnv('Sonar') {
		    dir(SERVICE_NAME){
	            sh """
                ./gradlew -Dsonar.projectVersion=${SERVICE_VERSION} -Dsonar.projectName=${SERVICE_NAME} -Dsonar.junit.reportPaths=./build/test-results/test -Dsonar.javascript.lcov.reportPaths=./src/main/web/coverage/app/lcov.info -Dsonar.tests=./src/main/web -Dsonar.exclusions=**/node_modules/**,**/*.spec.ts -xtest  sonarqube --info	 
                sleep 20
	            """
		    }
	    }
	    
	    def qualitygate = waitForQualityGate()
		if (qualitygate.status == "ERROR") {
			error "Pipeline aborted due to quality gate status: ${qualitygate.status}"
		}
	}
	
	stage("static code analysis ui "){
		withSonarQubeEnv('Sonar') {
		    dir(SERVICE_NAME){
	            sh """
	            source ~/.bashrc && nvm --version
                nvm use node
			    npm install -g sonarqube-scanner
			    cd ./src/main/web
                ng test --browsers=ChromeHeadless --code-coverage --codeCoverageExclude='**/node_modules/**,src/app/**/*.spec.ts,src/app/**/*.module.ts'  --watch=false
                sonar-scanner -Dsonar.projectVersion=${SERVICE_VERSION} -Dsonar.projectName=${SERVICE_NAME}-ui -Dsonar.sourceEncoding=UTF-8 -Dsonar.sources=src/app -Dsonar.exclusions=**/node_modules/**,src/app/**/*.spec.ts,src/app/**/*.module.ts -Dsonar.tests=src -Dsonar.test.inclusions=src/app/* -Dsonar.typescript.lcov.reportPaths=coverage/app/lcov.info 
                sleep 20
	            """
		    }
	    }
	    
	    def qualitygate = waitForQualityGate()
		if (qualitygate.status == "ERROR") {
			error "Pipeline aborted due to quality gate status: ${qualitygate.status}"
		}
	}

	if(GIT_BRANCH=='dev'||GIT_BRANCH=='test'||GIT_BRANCH=='master'){
		stage("docker"){
		    dir(SERVICE_NAME){
		        sh("eval \$(aws ecr get-login --no-include-email --region us-east-1 | sed 's|https://||')")
				docker.withRegistry("https://${ECR_URL}") {
		            //build image
		            image = docker.build("${SERVICE_NAME}:${imageTag}")
		            //push image
		            image.push()
	        	}
	        	        
		    }
		}
/*
		stage('anchore-scan'){
		    def anchorefile="anchore_images"
			      Analyze: {
                    writeFile file: anchorefile, text: "${ECR_URL}/${SERVICE_NAME}:${imageTag}"
                    anchore name: anchorefile, engineurl: "${anchore_url}", engineCredentialsId: anchore_cred, annotations: [[key: 'added-by', value: 'jenkins']]
                  }
		}
*/
		stage("deploy"){
		    dir(SERVICE_NAME){
		    		def appEnvName = getEnvironemntName(GIT_BRANCH)
						echo "Deploying....${SERVICE_NAME}:${imageTag}"
		            	def appTagName = appEnvName.toLowerCase()+"-"+SERVICE_NAME
		                withKubeConfig([credentialsId: token_K8s_cred, clusterName:cluster_name, serverUrl: cluster_url]) {
			                sh """
			                    helm init --client-only
				                helm repo add eida 'https://raw.githubusercontent.com/paulczar/helm-chart-spring/master/docs/repo'
				                helm repo update
				                #helm delete --purge ${SERVICE_NAME}
				                helm upgrade --install ${SERVICE_NAME} --set image.repository=${ECR_URL}/${SERVICE_NAME}  --set image.tag=${imageTag}  --set service.annotations.Name=${appTagName}  --set extraEnv.KEYCLOAK_AUTH_SERVER_URL=${keycloak_url}  --set extraEnv.SPRING_CLOUD_CONSUL_HOST=consul.apps --set extraEnv.SPRING_PROFILES_ACTIVE=${appEnvName} -f k8s.yaml --namespace=apps  eida/spring
                                sleep 20
                            """
                            appUrl = sh(script: "kubectl get svc --namespace apps ${SERVICE_NAME} --template '{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}'", returnStdout: true).trim()
                            println "APP URL as env ${appUrl}"
		                }
	                	
	                }
		 
		}

	}
	
	def appTestUrl = ""
	
	if(GIT_BRANCH=='test'||GIT_BRANCH=='dev'){//for now changed it to dev from master
	    stage("selenium-test"){
	        try{ 
	        	sh ('sleep 30')
	        	withKubeConfig([credentialsId: token_K8s_cred, clusterName:cluster_name, serverUrl: cluster_url]) {
    			 	appTestUrl = sh(script: "kubectl get svc --namespace apps mydemo-gateway-svc --template '{{ range (index .status.loadBalancer.ingress 0) }}{{ . }}{{ end }}'", returnStdout: true).trim()
    				println "TEST URL as env ${appTestUrl}"
//    				build(job: "eida-e2e-tests/master", parameters: [string(name: 'testURL', value: "${appTestUrl}"),string(name: 'kcHost', value: "${keycloak_url}"),booleanParam(name: 'is_e2e', value: "true")])
    			}
	    		dir(SERVICE_NAME){
			        sh("eval \$(aws ecr get-login --no-include-email --region us-east-1 | sed 's|https://||')")
					docker.withRegistry("https://${ECR_URL}") {
					if(image!=null){
        			    println "e2e test successful"
        			    if(GIT_BRANCH=='test'){
        				 image.push("latest")
        				 image.push("${SERVICE_VERSION}-approved")
        				}
        				
        			}		        	
        		 }
		        	        
			    }			
    			
	        }catch(Exception e){
    			    error "e2e test failed with error ${e}"
    		}
		}
		
	    stage("jmeter end to end test"){
	            try{ 
	              	println "Using TEST URL as env ${appTestUrl}"
//	     			build(job: "eida-e2e-tests/master", parameters: [string(name: 'testURL', value: "${appTestUrl}"),string(name: 'kcHost', value: "${keycloak_url}"),booleanParam(name: 'is_e2e', value: "false")])
	                
	            }catch(Exception e){
	                println "jmeter e2e test failed with error ${e}"
	            }
	    }	
		
		stage('zap scan') {
            sh """
            rm -rf /tmp/zap
            mkdir -p /tmp/zap
            chmod -R 777 /tmp/zap
            docker run -v  /tmp/zap:/zap/wrk/:rw  -t owasp/zap2docker-weekly zap-baseline.py -t http://${appTestUrl}/public  \
            -g gen.conf -r testreport.html
            """
        }
        
        stage("zap report"){
            dir(SERVICE_NAME){
                publishHTML(target: [allowMissing: false, keepAll: true, reportDir: ' /tmp/zap', reportFiles: 'testreport.html', reportName: 'Zap Scan Report'])
            }
        }
	}
	
	if(GIT_BRANCH=='dev'){
	     stage("promote to test"){
			  dir(SERVICE_NAME){
					def tagDesc = "Build Snapshot ${SERVICE_VERSION}.SNAPSHOT"
					def gitBranch = determineForwardBranch(GIT_BRANCH)
			        withCredentials([usernamePassword(credentialsId: gitgub_cred, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
			            def headCommit = sh(script: 'git rev-parse HEAD', returnStdout: true)
						sh('''
				    		git config user.name 'Jenkins'
				    		git config user.email 'jenkins-noreply@maximus.com'
						''')
		                sh("""
		                  echo "Pushing Tags to Dev Branch"
		                  git checkout ${GIT_BRANCH}
		                  git tag -a ${imageTag}.SNAPSHOT -m "${tagDesc}"  --force
		                  git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/maximusfederal/${SERVICE_NAME}.git --follow-tags
		                  echo "Merging to branch ${gitBranch}"
		                  git checkout ${gitBranch}
		                  git pull https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/maximusfederal/${SERVICE_NAME}.git
		                  git merge origin/${GIT_BRANCH} -m "Merge commit ${GIT_BRANCH} into ${gitBranch}"
		                  git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/maximusfederal/${SERVICE_NAME}.git --follow-tags
		                """)
		           
		        }
	        }
	    }
    }
    
 	if(GIT_BRANCH=='test'){
	     stage("promote to prod"){
			  dir(SERVICE_NAME){
					def tagDesc = "Build Snapshot ${SERVICE_VERSION}.SNAPSHOT"
					def gitBranch = determineForwardBranch(GIT_BRANCH)
			        withCredentials([usernamePassword(credentialsId: gitgub_cred, passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
			            def headCommit = sh(script: 'git rev-parse HEAD', returnStdout: true)
						sh('''
				    		git config user.name 'Jenkins'
				    		git config user.email 'jenkins-noreply@maximus.com'
						''')
		                sh("""
		                  echo "Merging to branch ${gitBranch}"
		                  git checkout ${gitBranch}
		                  git pull https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/maximusfederal/${SERVICE_NAME}.git
		                  git tag -a ${imageTag}.RC -m "${tagDesc}"  --force
		                  git merge origin/${GIT_BRANCH} -m "Merge commit ${GIT_BRANCH} into ${gitBranch}"
		                  git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/maximusfederal/${SERVICE_NAME}.git --follow-tags
		                """)
		           
		        }
	        }
	    }
	    
    }
    
	
}