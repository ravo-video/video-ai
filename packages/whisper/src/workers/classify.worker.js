import { env, pipeline } from '@xenova/transformers';

// Skip local model check
env.allowLocalModels = false;

// Use the Singleton pattern to enable lazy construction of the pipeline.
class PipelineSingleton {
  static task = 'text-classification';
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance = null;

  /**
   * Utility factory method to get current instance.
   * @property {function} [progress_callback=null] If specified, this function will be called during model construction, to provide the user with progress updates.
   * @returns {import('@xenova/transformers').TextClassificationPipeline} A Pipeline object for the specified task.
   */
  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener('message', async event => {
  // Retrieve the classification pipeline. When called for the first time,
  // this will load the pipeline and save it for future use.
  let classifier = await PipelineSingleton.getInstance(x => {
    // We also add a progress callback to the pipeline so that we can
    // track model loading.
    self.postMessage(x);
  });

  // Actually perform the classification
  let output = await classifier(event.data.text);

  // Send the output back to the main thread
  self.postMessage({
    status: 'complete',
    output: output,
  });
});
