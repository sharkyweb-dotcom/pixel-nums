#!/bin/bash -l

#SBATCH --job-name=dpo_step
#SBATCH --partition=gpu
#SBATCH --mem=256GB
#SBATCH --cpus-per-task=24
#SBATCH --output=output/out.txt
#SBATCH --gres=gpu:3
#SBATCH --gres-flags=enforce-binding
#SBATCH --time=2-00:00:00

# get conda
module load anaconda/3-2021.05

echo "try to create environment"
conda env create -f env.yml

echo "try to activate environment"
conda activate cnn-env
# conda activate dpo2

python main.py



