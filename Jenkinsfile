pipeline{  
agent any
    stages {
        stage('Cloning Git'){
            steps {
                     checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/prosaox/StudyBuddy.git']]])
            }
        } 
}
}
