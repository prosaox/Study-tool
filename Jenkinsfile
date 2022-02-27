pipeline{  
agent any
environment{
    registry = "prosaox/studybuddy"
    dockerImage=''
    registryCredential= 'prosaox' 
}
    stages {
        stage('Cloning Git'){
            steps {
                     checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/prosaox/StudyBuddy.git']]])
            }
        } 
    }
//      stage('Building Image'){  
//             steps{    
//                 script {
//                     dockerImage = docker.build registry
// }
// }
// }
//        stage('Upload Image') {
// steps{    
//          script {
//             docker.withRegistry( '', registryCredential ) {
//             dockerImage.push()
//             }
//         }
//       }
//   }
        // Stopping Docker containers for cleaner Docker run
    //  stage('docker stop container') {
    //      steps {
    //         sh 'docker ps -f name=mypythonappContainer -q | xargs --no-run-if-empty docker container stop'
    //         sh 'docker container ls -a -fname=mypythonappContainer -q | xargs -r docker container rm'
    //      }
    //    }
}

