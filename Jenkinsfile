pipeline{  
agent any
// tools { nodejs "nodejs" }
environment{
    registry = "prosaox/studybuddy"
    dockerImage=''
    registryCredential= 'prosaox' 
}
    stages {
        stage('Cloning Git'){
            steps {
                     checkout([$class: 'GitSCM', branches: [[name: '*/test']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/prosaox/StudyBuddy.git']]])
            }
        } 
        stage('Start')
        {
            steps{
                script {
                    sh 'cd Backend'
                    sh 'npm --version'
                    sh 'npm install'
                    sh 'npm init'
                    sh 'npm install jest supertest express bcryptjs jsonwebtoken mongoose express-validator'
                }
            }
        }
        stage('Build')
        {
            steps{
                script {
                    sh 'nodemon'
                }
            }
        }
        stage('Test')
        {
            steps{
                script {
                    sh 'cd Backend'
                    sh 'npm run test'
                }
            }
        }

    
//      stage('Building Image'){  
//             steps{    
//                 script {
//                     dockerImage = docker.build registry
// }
// }

//     }
//        stage('Upload Image') {
// steps{    
//          script {
//             docker.withRegistry( '', registryCredential ) {
//             dockerImage.push()
//             }
//         }
//       }
//   }
    }
        // Stopping Docker containers for cleaner Docker run
    //  stage('docker stop container') {
    //      steps {
    //         sh 'docker ps -f name=mypythonappContainer -q | xargs --no-run-if-empty docker container stop'
    //         sh 'docker container ls -a -fname=mypythonappContainer -q | xargs -r docker container rm'
    //      }
    //    }
}

