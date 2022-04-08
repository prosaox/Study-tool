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
    // }
        // Stopping Docker containers for cleaner Docker run
    //  stage('docker stop container') {
    //      steps {
    //         sh 'docker ps -f name=mypythonappContainer -q | xargs --no-run-if-empty docker container stop'
    //         sh 'docker container ls -a -fname=mypythonappContainer -q | xargs -r docker container rm'
    //      }
    //    }
// }

pipeline {
  agent any
 environment{
    registry = "prosaox/studybuddy"
    dockerImage=''
    registryCredential= 'prosaox'
}
  tools {nodejs "node"}
 
  stages {
              stage('Cloning Git'){
            steps {
                     checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/prosaox/StudyBuddy.git']]])
            }
        } 
        stage('Start')
        {
            steps{
                script {
                    sh 'cd Server'
                    sh 'npm --version'
                    sh 'npm install cors'
                    sh 'npm install -g  nodemon cors jest supertest express bcryptjs jsonwebtoken mongoose express-validator --save'
                }
            }
        }
        // stage('Build')
        // {
        //         steps{
        //         dir('Server') {
        //             sh 'chmod 777 ./node_modules/.bin/nodemon'
        //             sh 'nodemon'
        //         }
        //     }
        // }
        // stage('Test')
        // {
        //     steps{
        //         script {
        //         dir('Server') {
        //             sh 'npm run test'
        //         }
        //         }
        //     }
        // }
           stage('Building Image'){  
            steps{    
                script {
                    dockerImage = docker.build registry
}
}
  }
         stage('Upload Image') {
steps{    
         script {
            docker.withRegistry( '', registryCredential ) {
            dockerImage.push()
            }
        }
      }
  }
    }
  }
